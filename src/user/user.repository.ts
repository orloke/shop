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

  async getUserByEmail(email: string): Promise<boolean> {
    const user = this.users.find((user) => user.email === email);
    return user !== undefined;
  }
}
