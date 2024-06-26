import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBranch } from './entities/user-branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBranch])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule.forFeature([UserBranch])],
})
export class UsersBranchesModule {}
