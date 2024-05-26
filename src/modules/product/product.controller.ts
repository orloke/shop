import { Body, Controller, Get, Post } from '@nestjs/common';

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
}
