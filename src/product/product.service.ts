import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: ProductEntity) {
    return await this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find();
  }
}
