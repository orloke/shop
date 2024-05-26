import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productCreated = this.productService.createProduct(productData);
    return productCreated;
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async getProductById(@Param('id') id: string) {
    console.log('Fetching from database');
    return this.productService.getProductById(id);
  }
}
