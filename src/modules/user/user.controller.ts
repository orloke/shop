import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  // @Post('/add-product')
  // async addProductsToUser(
  //   @Body('userId') userId: string,
  //   @Body('productId') productId: string,
  // ) {
  //   try {
  //     await this.userService.addProductsToUser(userId, productId);
  //     return { status: 'Product added to user' };
  //   } catch (error) {
  //     if (error.message === 'User not found') {
  //       return { status: 'User not found' };
  //     }
  //     if (error.message === 'Product not found') {
  //       return { status: 'Product not found' };
  //     }
  //     return { status: 'Error adding product to user' };
  //   }
  // }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.userService.getUser(id);
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
