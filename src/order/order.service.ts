import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
      orderEntity.amount = createdOrder.amount;
      orderEntity.status = createdOrder.status;
      orderEntity.user = user;
      const createOrder = await this.orderRepository.save(orderEntity);
      return { status: 'Order created', order: createOrder };
    } catch (error) {
      if (error.message === 'User not found') {
        return { status: 'User not found' };
      }
      return { status: 'Error creating order' };
    }
  }
}
