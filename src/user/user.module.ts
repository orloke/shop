import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleEmailValidator } from './dto/validation/singleEmail.validator';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { ProductEntity } from '../product/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity])],
  controllers: [UserController],
  providers: [SingleEmailValidator, UserService, ProductService],
})
export class UserModule {}
