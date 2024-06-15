import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';
import { UsersService } from '../users/users.service';

@Controller('branches')
export class BranchesController {
  constructor(
    private readonly branchService: BranchesService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async findAll(@Req() req): Promise<Branch[]> {
    const user = req.user;
    if (this.userService.authorize(user, 'list')) {
      return this.branchService.findAll();
    } else {
      throw new ForbiddenException('User not authorized to list branches');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Branch> {
    const user = req.user;
    if (this.userService.authorize(user, 'view')) {
      return this.branchService.findOne(id);
    } else {
      throw new ForbiddenException('User not authorized to view branch');
    }
  }

  @Post()
  async create(@Body() branch: Branch, @Req() req): Promise<Branch> {
    const user = req.user;
    if (this.userService.authorize(user, 'create')) {
      return this.branchService.create(branch);
    } else {
      throw new ForbiddenException('User not authorized to create branch');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() branch: Partial<Branch>,
    @Req() req,
  ): Promise<void> {
    const user = req.user;
    if (this.userService.authorize(user, 'update')) {
      await this.branchService.update(id, branch);
    } else {
      throw new ForbiddenException('User not authorized to update branch');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const user = req.user;
    if (this.userService.authorize(user, 'delete')) {
      await this.branchService.remove(id);
    } else {
      throw new ForbiddenException('User not authorized to delete branch');
    }
  }
}
