import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/CreateProduct.dto';
import { UpdateProductDTO } from './dto/ListProduct';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productCreated = this.productService.createProduct(productData);
    return productCreated;
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const productUpdated = await this.productRepository.update(id, productData);

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: productUpdated,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const productDeleted = await this.productRepository.delete(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: productDeleted,
    };
  }
}
