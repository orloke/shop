import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './dto/CreateProduct.dto';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productData: CreateProductDTO) {
    const product = new ProductEntity();

    product.name = productData.name;
    product.value = productData.value;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.categoric = productData.categoric;
    product.info = productData.info;
    product.images = productData.images;

    return await this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find();
  }
}
