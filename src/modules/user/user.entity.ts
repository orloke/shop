import { Exclude } from 'class-transformer';
import { OrderEntity } from '../order/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  // @ManyToMany(() => ProductEntity, (product) => product.users)
  // @JoinTable({
  //   name: 'users_products',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  // })
  // products: ProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
