import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';
import { UsersModule } from '../users/users.module';
import { UsersBranchesModule } from 'src/users-branches/users-branches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branch]),
    UsersModule,
    UsersBranchesModule,
  ],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
