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

  async updateUser(id: string, data: Partial<UserEntity>) {
    const userIndex = this.searchUserIndex(id);

    this.users[userIndex] = { ...this.users[userIndex], ...data };
    return this.users[userIndex];
  }

  async deleteUser(id: string) {
    const userIndex = this.searchUserIndex(id);

    this.users.splice(userIndex, 1);
    return { status: 'User deleted' };
  }

  private searchUserIndex(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) throw new Error('User not found');

    return userIndex;
  }
}
