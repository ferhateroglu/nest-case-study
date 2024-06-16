import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
    try {
      const user = await this.usersService.checkUser(
        authenticateDto.email,
        authenticateDto.password,
      );

      const response = this.authService.authenticate(user);

      return res.status(HttpStatus.OK).json({ data: response });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post('register')
  async register(@Res() res, @Body() user: CreateUserDto) {
    try {
      const response = await this.usersService.create(user);

      return res.status(HttpStatus.CREATED).json({ data: response });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }
}
