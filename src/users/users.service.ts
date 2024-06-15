import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.role = user.role;
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async authenticate(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  authorize(user: User, action: string): boolean {
    if (user.role === UserRole.OWNER) {
      return true;
    } else if (
      user.role === UserRole.EMPLOYEE &&
      ['view', 'list'].includes(action)
    ) {
      return true;
    }
    return false;
  }
}
