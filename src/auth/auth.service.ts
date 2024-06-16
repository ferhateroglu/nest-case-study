import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from './interfaces/user.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  authenticate(user: Partial<User>): IAuthenticate {
    const token = sign({ ...user }, 'secrete');

    return { token, user };
  }
}
