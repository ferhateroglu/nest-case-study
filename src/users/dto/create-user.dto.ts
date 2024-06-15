import { UserRole } from '../entities/user.entity';
import { IsEnum, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
