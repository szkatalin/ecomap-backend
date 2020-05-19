import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from './decorators/get-user.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from './guard/role.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './model/role.enum';
import { User } from './model/user.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get currently logged in user' })
  @ApiOkResponse({ type: User })
  public getUser(@GetUser() user) {
    return this.userService.getUserById(user.sub);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  public getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: `Update user's role` })
  @ApiOkResponse({ type: User })
  @Put(':id/role')
  public updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto
  ) {
    return this.userService.updateUserRole(id, updateUserRoleDto.role);
  }
}
