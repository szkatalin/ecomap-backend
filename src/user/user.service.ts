import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Role } from './model/role.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.getAllUsers();
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async updateUserRole(id: string, role: Role): Promise<User> {
    return await this.usersRepository.updateUserRole(id, role);
  }
}
