import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserBranch } from '../../users-branches/entities/user-branch.entity';

export enum UserRole {
  OWNER = 'owner',
  EMPLOYEE = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @OneToMany(() => UserBranch, (userBranch) => userBranch.user)
  userBranches: UserBranch[];
}
