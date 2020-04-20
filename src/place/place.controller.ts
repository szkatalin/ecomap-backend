import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { Place } from './model/place.entity';
import { GetPlacesFilterDto } from './dto/get-places-filter.dto';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  @ApiOperation({ summary: 'Get places' })
  public getPlaces(
    @Query(ValidationPipe) filterDto: GetPlacesFilterDto
  ): Promise<Place[]> {
    return this.placeService.getAllPlaces(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get place by id' })
  public getPlaceById(
    @Param('id', ParseIntPipe) placeId: number
  ): Promise<Place> {
    return this.placeService.getPlaceById(placeId);
  }
}
