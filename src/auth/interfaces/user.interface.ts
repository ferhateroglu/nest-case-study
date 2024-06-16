import { User } from '../../users/entities/user.entity';

export enum Role {
  OWNER = 'owner',
  EMPLOYEE = 'employee',
}

export interface IAuthenticate {
  readonly user: Partial<User>;
  readonly token: string;
}
