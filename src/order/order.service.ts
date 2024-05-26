import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './orderItem.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async create(userId: string, createdOrder: CreateOrderDto) {
    try {
      const user = await this.findUserById(userId);
      const orderEntity = new OrderEntity();
      orderEntity.status = createdOrder.status;
      orderEntity.user = user;

      const items = await Promise.all(
        createdOrder.items.map(async (item) => {
          const products = await this.productRepository.findOne({
            where: { id: item.productId },
          });
          const orderItem = new OrderItemEntity();
          orderItem.quantity = item.quantity;
          orderItem.salePrice = products.value;
          orderItem.product = products;
          return orderItem;
        }),
      );

      orderEntity.items = items;

      const amountOrder = items.reduce((acc, item) => {
        return acc + item.salePrice * item.quantity;
      }, 0);

      orderEntity.amount = amountOrder;
      const createOrder = await this.orderRepository.save(orderEntity);
      return { status: 'Order created', order: createOrder };
    } catch (error) {
      console.log('🚀 ~ OrderService ~ create ~ error:', error);
      if (error.message === 'User not found') {
        return { status: 'User not found' };
      }
      return { status: 'Error creating order' };
    }
  }
}
