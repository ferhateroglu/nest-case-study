import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserBranch } from 'src/users-branches/entities/user-branch.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  full_address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  phone: string;

  @OneToMany(() => UserBranch, (userBranch) => userBranch.branch)
  userBranches: UserBranch[];
}
