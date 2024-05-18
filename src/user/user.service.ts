import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListDto } from './dto/UserList.dto';
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
}
