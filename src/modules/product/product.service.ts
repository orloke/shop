import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';

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
    product.quantityAvailable = productData.quantityAvailable;
    product.description = productData.description;
    product.categoric = productData.categoric;
    product.info = productData.info;
    product.images = productData.images;

    // Object.assign(product, productData as ProductEntity);

    return await this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProductById(id: string) {
    if (!id) {
      throw new NotFoundException('Id is required');
    }
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
