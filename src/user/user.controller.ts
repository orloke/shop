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
import { UserListDto } from './dto/UserList.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = data.name;
    userEntity.email = data.email;
    userEntity.password = data.password;
    userEntity.id = uuid();

    this.userService.createUser(userEntity);
    return { ...new UserListDto(userEntity.id, userEntity.name) };
  }

  @Get()
  async getUsers() {
    const usersSave = await this.userService.getUsers();
    return usersSave;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
      const userUpdated = await this.userService.updateUser(id, data);
      console.log(
        '🚀 ~ UserController ~ updateUser ~ userUpdated:',
        userUpdated,
      );
      return userUpdated;
    } catch (error) {
      if (error.message === 'User not found') {
        return { status: 'User not found' };
      }
      return { status: 'Error updating user' };
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return { status: 'User deleted' };
    } catch (error) {
      if (error.message === 'User not found') {
        return { status: 'User not found' };
      }
      return { status: 'Error deleting user' };
    }
  }
}
