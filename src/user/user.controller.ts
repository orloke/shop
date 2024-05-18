import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = data.name;
    userEntity.email = data.email;
    userEntity.password = data.password;

    this.userRepository.createUser(userEntity);
    return { ...data };
  }

  @Get()
  async getUsers() {
    return this.userRepository.getUsers();
  }
}
