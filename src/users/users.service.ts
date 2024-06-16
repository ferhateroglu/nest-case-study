import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findbyEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.findbyEmail(user.email);
    if (existingUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User with that email already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<any> {
    const response = await this.userRepository.delete(id);
    if (response.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted successfully', statusCode: HttpStatus.OK };
  }

  async checkUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    delete user.password;

    return user;
  }
}
