import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImagesProduct } from './images-product.entity';
import { InfosProduct } from './infos-product.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', length: 100, nullable: false })
  userId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'value', nullable: false })
  value: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'categoric', length: 100, nullable: false })
  categoric: string;

  @OneToMany(() => InfosProduct, (info) => info.product, {
    cascade: true,
    eager: true,
  })
  info: InfosProduct[];

  @OneToMany(() => ImagesProduct, (images) => images.product, {
    cascade: true,
    eager: true,
  })
  images: ImagesProduct[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
