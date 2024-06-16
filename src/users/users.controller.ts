import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/interfaces/user.interface';
import { AcceptedRoles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
