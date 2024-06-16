import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchService: BranchesService) {}
  @Post()
  create(@Body() branch: Branch) {
    return this.branchService.create(branch);
  }

  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() branch: Branch) {
    return this.branchService.update(+id, branch);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
