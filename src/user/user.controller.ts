import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from './decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './model/role.enum';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  public getUser(@GetUser() user) {
    return this.userService.getUserById(user.sub);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  public getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/role')
  public updateUserRole(@Param('id') id: string, @Body() role: Role) {
    return this.userService.updateUserRole(id, role);
  }
}
