import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];
  async createUser(user) {
    this.users.push(user);
    return { status: 'User created' };
  }

  async getUsers() {
    return this.users;
  }
}
