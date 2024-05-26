import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';

@Entity('orders_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'quantity',
    nullable: false,
  })
  quantity: number;

  @Column({
    name: 'sale_price',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  salePrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItem, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
