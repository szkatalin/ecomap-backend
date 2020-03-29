import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../user/guard/role.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { Role } from '../user/model/role.enum';
import { GetUser } from '../user/decorators/get-user.decorator';
import { Recommendation } from './model/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { CreateOperationalEventDto } from './dto/create-operational-event.dto';

@ApiTags('Recommendation')
@ApiBearerAuth()
@Controller('recommendations')
export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Get('all')
  @ApiOperation({ summary: 'Get all recommendations' })
  getAllRecommendations(): Promise<Recommendation[]> {
    return this.recommendationService.getAllRecommendations();
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Get(':id')
  @ApiOperation({ summary: 'Get recommendation by id' })
  getRecommendationById(@Param('id', ParseIntPipe) recommendationId: number) {
    return this.recommendationService.getRecommendationById(recommendationId);
  }

  @Post()
  @ApiOperation({ summary: 'Add new place recommendation' })
  createPlaceRecommendation(
    @GetUser() user,
    @Body(new ValidationPipe({ transform: true }))
    recommendationDto: CreateRecommendationDto
  ) {
    const userId = user.sub;
    return this.recommendationService.createPlaceRecommendation(
      userId,
      recommendationDto
    );
  }

  @Post(':id')
  @ApiOperation({ summary: 'Add existing place recommendation' })
  addExistingPlaceRecommendation(
    @Param('id', ParseIntPipe) placeId: number,
    @GetUser() user,
    @Body(new ValidationPipe({ transform: true }))
    recommendationDto: CreateRecommendationDto
  ) {
    const userId = user.sub;
    return this.recommendationService.createPlaceRecommendation(
      userId,
      recommendationDto,
      placeId
    );
  }

  @Post(':id/delete')
  @ApiOperation({ summary: 'Add delete recommendation' })
  deletePlaceRecommendation(
    @Param('id', ParseIntPipe) placeId: number,
    @GetUser() user,
    @Body() comment: string
  ) {
    const userId = user.sub;
    return this.recommendationService.deletePlaceRecommendation(
      userId,
      placeId,
      comment
    );
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post(':id/evaluate')
  @ApiOperation({ summary: 'Evaluate recommendation' })
  evaluateRecommendation(
    @Param('id', ParseIntPipe) recommendationId: number,
    @GetUser() user,
    @Body(new ValidationPipe({ transform: true }))
    createOperationalEventDto: CreateOperationalEventDto
  ) {
    return this.recommendationService.evaluateRecommendation(
      recommendationId,
      user.sub,
      createOperationalEventDto
    );
  }
}
