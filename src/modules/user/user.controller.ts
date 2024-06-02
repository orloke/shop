import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { PasswordHashPipe } from '../../resources/pipes/password-hash.pipe';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() data: CreateUserDto,
    @Body('password', PasswordHashPipe) passwordHashed: string,
  ) {
    return await this.userService.createUser({
      ...data,
      password: passwordHashed,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
