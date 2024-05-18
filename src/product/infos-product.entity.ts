import { Column, Entity } from 'typeorm';

@Entity({ name: 'infos_product' })
export class InfosProduct {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
