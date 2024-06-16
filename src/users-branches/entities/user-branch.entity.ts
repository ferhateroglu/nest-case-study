import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Branch } from '../../branches/entities/branch.entity';

@Entity('user_branch')
export class UserBranch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBranches)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.userBranches)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;
}
