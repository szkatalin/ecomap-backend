import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user.service';
import { User } from '../model/user.entity';
import { ROLES } from '../model/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const req = context.switchToHttp().getRequest();
    const userId = req.user['sub'];

    let enable = false;

    await this.userService.getUserById(userId).then((user: User) => {
      roles.map(role => {
        if (this.matchRoles(user.role, role)) enable = true;
      });
    });

    return enable;
  }

  matchRoles(r1: any, r2: any): boolean {
    return ROLES.indexOf(r1) === ROLES.indexOf(r2);
  }
}
