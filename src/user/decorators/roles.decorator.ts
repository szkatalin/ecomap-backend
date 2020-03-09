import { SetMetadata } from '@nestjs/common';
import { Role } from '../model/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
