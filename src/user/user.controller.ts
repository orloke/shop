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
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = data.name;
    userEntity.email = data.email;
    userEntity.password = data.password;
    userEntity.id = uuid();

    const userCreated = await this.userService.createUser(userEntity);

    return {
      ...new UserListDto(
        userEntity.id,
        userEntity.name,
        userEntity.email,
        userCreated.products || [],
        userCreated.createdAt,
        userCreated.updatedAt,
        userCreated.deletedAt,
      ),
    };
  }

  @Post('/add-product')
  async addProductsToUser(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    try {
      await this.userService.addProductsToUser(userId, productId);
      return { status: 'Product added to user' };
    } catch (error) {
      if (error.message === 'User not found') {
        return { status: 'User not found' };
      }
      if (error.message === 'Product not found') {
        return { status: 'Product not found' };
      }
      return { status: 'Error adding product to user' };
    }
  }

  @Get()
  async getUsers() {
    const usersSave = await this.userService.getUsers();
    const listUsers = usersSave.map(
      (user) =>
        new UserListDto(
          user.id,
          user.name,
          user.email,
          undefined,
          user.createdAt,
          user.updatedAt,
          user.deletedAt,
        ),
    );
    return listUsers;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.findUser(id);

      return new UserListDto(
        user.id,
        user.name,
        user.email,
        user.products,
        user.createdAt,
        user.updatedAt,
        user.deletedAt,
      );
    } catch (error) {
      if (error.message === 'User not found') {
        return { status: 'User not found' };
      }
      return { status: 'Error getting user' };
    }
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
      const userUpdated = await this.userService.updateUser(id, data);
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
