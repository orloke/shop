import { Column, Entity } from 'typeorm';

@Entity({ name: 'images_product' })
export class ImagesProduct {
  @Column({ name: 'name', length: 100, nullable: false })
  url: string;

  @Column({ name: 'name', length: 255, nullable: false })
  description: string;
}
