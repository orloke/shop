import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async createUser(data: UserEntity) {
    return await this.userRepository.save(data);
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

  async addProductsToUser(userId: string, productId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['products'],
    });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (user && product) {
      user.products.push(product);
      await this.userRepository.save(user);
    }
  }
}
