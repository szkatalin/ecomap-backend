import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { Place } from './model/place.entity';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all places' })
  getPlaces(): Promise<Place[]> {
    return this.placeService.getAllPlaces();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get place by id' })
  getPlaceById(@Param('id', ParseIntPipe) placeId: number): Promise<Place> {
    return this.placeService.getPlaceById(placeId);
  }
}
