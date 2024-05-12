import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SingleEmailValidator } from './dto/validation/singleEmail.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, SingleEmailValidator],
})
export class UserModule {}
