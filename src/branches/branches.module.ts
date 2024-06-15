import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';
// import user module
import { UsersModule } from '../users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Branch]), UsersModule],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
