import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() data) {
    this.userRepository.createUser(data);
    return { ...data };
  }

  @Get()
  async getUsers() {
    return this.userRepository.getUsers();
  }
}
