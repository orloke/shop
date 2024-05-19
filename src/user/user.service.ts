import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListDto } from './dto/UserList.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map(
      (user) =>
        new UserListDto(
          user.id,
          user.name,
          user.email,
          user.createdAt,
          user.updatedAt,
          user.deletedAt,
        ),
    );
  }

  async getUser(id: string) {
    const user = await this.findUser(id);
    return new UserListDto(
      user.id,
      user.name,
      user.email,
      // user.products,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  async createUser(data: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = data.name;
    userEntity.email = data.email;
    userEntity.password = data.password;

    const userCreated = await this.userRepository.save(data);

    return {
      ...new UserListDto(
        userCreated.id,
        userCreated.name,
        userCreated.email,
        // userCreated.products || [],
        userCreated.createdAt,
        userCreated.updatedAt,
        userCreated.deletedAt,
      ),
    };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.findUser(id);
    const userUpdated = await this.userRepository.update(id, data);
    return userUpdated;
  }

  async deleteUser(id: string) {
    const user = await this.findUser(id);
    await this.userRepository.remove(user);
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  // async addProductsToUser(userId: string, productId: string): Promise<void> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['products'],
  //   });
  //   const product = await this.productRepository.findOne({
  //     where: { id: productId },
  //   });
  //   if (user && product) {
  //     user.products.push(product);
  //     await this.userRepository.save(user);
  //   }
  // }
}
