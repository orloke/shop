import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateProductDTO } from './dto/CreateProduct.dto';
import { UpdateProductDTO } from './dto/ListProduct';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Controller('products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async criaNovo(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity();

    product.id = uuid();
    product.name = productData.name;
    product.userId = productData.userId;
    product.value = productData.value;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.categoric = productData.categoric;
    product.info = productData.info;
    product.images = productData.images;

    const productCreated = this.productRepository.save(product);
    return productCreated;
  }

  @Get()
  async getProducts() {
    return this.productRepository.getProducts();
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
