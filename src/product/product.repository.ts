import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private product: ProductEntity[] = [];

  getProducts() {
    return this.product;
  }

  save(dataProduct: ProductEntity) {
    this.product.push(dataProduct);
    return dataProduct;
  }

  private searchProductId(id: string) {
    const productId = this.product.find((product) => product.id === id);

    if (!productId) {
      throw new Error('Produto não existe');
    }

    return productId;
  }

  async update(id: string, dataProduct: Partial<ProductEntity>) {
    const dataNotUpdate = ['id', 'userId'];
    const product = this.searchProductId(id);
    Object.entries(dataProduct).forEach(([key, value]) => {
      if (dataNotUpdate.includes(key)) {
        return;
      }
      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    const productRemove = this.searchProductId(id);
    this.product = this.product.filter((product) => product.id !== id);
    return productRemove;
  }
}
