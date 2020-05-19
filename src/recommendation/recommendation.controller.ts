import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from '../user/guard/role.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { Role } from '../user/model/role.enum';
import { GetUser } from '../user/decorators/get-user.decorator';
import { Recommendation } from './model/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { CreateOperationalEventDto } from './dto/create-operational-event.dto';
import { OperationalEvent } from './model/operational-event.entity';

@ApiTags('Recommendation')
@ApiBearerAuth()
@Controller('recommendations')
export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  @Get('currentuser')
  @ApiOperation({ summary: 'Get recommendations for currently logged in user' })
  @ApiOkResponse({ type: Recommendation, isArray: true })
  public getRecommendationsForUser(@GetUser() user) {
    const userId = user.sub;
    return this.recommendationService.getRecommendationsForUser(userId);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Get()
  @ApiOperation({ summary: 'Get all recommendations' })
  @ApiOkResponse({ type: Recommendation, isArray: true })
  public getAllRecommendations(): Promise<Recommendation[]> {
    return this.recommendationService.getAllRecommendations();
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Get(':id')
  @ApiOperation({ summary: 'Get recommendation by id' })
  @ApiOkResponse({ type: Recommendation })
  public getRecommendationById(
    @Param('id', ParseIntPipe) recommendationId: number
  ) {
    return this.recommendationService.getRecommendationById(recommendationId);
  }

  @Post()
  @ApiOperation({ summary: 'Add new place recommendation' })
  @ApiOkResponse({ type: Recommendation })
  public createPlaceRecommendation(
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

  @Post('places/:id')
  @ApiOperation({ summary: 'Add existing place recommendation' })
  @ApiOkResponse({ type: Recommendation })
  public addExistingPlaceRecommendation(
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

  @Post('places/:id/delete')
  @ApiOperation({ summary: 'Add delete recommendation' })
  @ApiOkResponse({ type: Recommendation })
  public deletePlaceRecommendation(
    @Param('id', ParseIntPipe) placeId: number,
    @GetUser() user,
    @Body() comment?: string
  ) {
    const userId = user.sub;
    return this.recommendationService.deletePlaceRecommendation(
      userId,
      placeId,
      comment
    );
  }

  @ApiOperation({ summary: 'Evaluate recommendation' })
  @ApiOkResponse({ type: OperationalEvent })
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @Post(':id/evaluate')
  public evaluateRecommendation(
    @Param('id', ParseIntPipe) recommendationId: number,
    @GetUser() user,
    @Body(new ValidationPipe({ transform: true }))
    createOperationalEventDto: CreateOperationalEventDto
  ) {
    const userId = user.sub;
    return this.recommendationService.evaluateRecommendation(
      recommendationId,
      userId,
      createOperationalEventDto
    );
  }
}
