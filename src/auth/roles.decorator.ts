import { SetMetadata } from '@nestjs/common';

export const AcceptedRoles = (...args: string[]) => SetMetadata('roles', args);
