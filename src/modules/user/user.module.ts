import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleEmailValidator } from './dto/validation/singleEmail.validator';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [SingleEmailValidator, UserService],
  exports: [UserService],
})
export class UserModule {}
