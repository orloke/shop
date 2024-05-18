import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];
  async createUser(user: UserEntity) {
    this.users.push(user);
    return { status: 'User created' };
  }

  async getUsers() {
    return this.users;
  }

  async getUserByEmail(email: string): Promise<boolean> {
    const user = this.users.find((user) => user.email === email);
    return user !== undefined;
  }
}
