import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListDto } from './dto/UserList.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const usersSave = await this.userRepository.find();
    const listUsers = usersSave.map(
      (user) => new UserListDto(user.id, user.name),
    );
    return listUsers;
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

  private async findUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
