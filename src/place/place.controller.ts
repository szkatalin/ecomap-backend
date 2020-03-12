import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../user/guard/role.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { Role } from '../user/model/role.enum';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  @UseGuards(RoleGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get()
  testRoleGuard() {
    return 'test';
  }
}
