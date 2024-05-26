import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductService } from './product.service';
// import { ProductEntity } from './product.entity';
import { Cache } from 'cache-manager';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private managerCache: Cache,
  ) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productCreated = this.productService.createProduct(productData);
    return productCreated;
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async getProductById(@Param('id') id: string) {
    console.log('Fetching from database');
    return this.productService.getProductById(id);
  }

  // @Get('/:id')
  // async listaUm(@Param('id') id: string) {
  //   let product = await this.managerCache.get<ProductEntity>(`product-${id}`);

  //   if (!product) {
  //     console.log('Obtendo product do cache!');
  //     product = await this.productService.getProductById(id);

  //     await this.managerCache.set(`product-${id}`, product);
  //   }

  //   return {
  //     message: 'Product find with success.',
  //     product,
  //   };
  // }
}
