import { ProductEntity } from '../../product/product.entity';

export class UserListDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly products?: ProductEntity[],
    readonly createdAt?: string,
    readonly updatedAt?: string,
    readonly deletedAt?: string,
  ) {}
}
