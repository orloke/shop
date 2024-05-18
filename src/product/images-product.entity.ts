import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images_product' })
export class ImagesProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  url: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
