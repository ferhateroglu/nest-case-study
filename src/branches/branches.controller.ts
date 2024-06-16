import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';

import { AcceptedRoles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../auth/interfaces/user.interface';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchService: BranchesService) {}

  @Post()
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBranchDetails(@Param('id') id: string) {
    return this.branchService.getBranchDetails(+id);
  }

  @Patch(':id')
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() branch: Branch) {
    return this.branchService.update(+id, branch);
  }

  // add user to branch
  @Post(':id/users')
  @AcceptedRoles(Role.OWNER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async addUserToBranch(
    @Param('id') id: string,
    @Body() body: { userId: number },
  ) {
    return this.branchService.addUserToBranch(+id, body.userId);
  }
}
