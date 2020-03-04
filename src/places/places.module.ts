import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './model/address.entity';
import { Place } from './model/place.entity';
import { PlaceOperationalEvent } from './model/place-operational-event.entity';
import { PlaceCategoryDetails } from './model/place-category-details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Place,
      Address,
      PlaceOperationalEvent,
      PlaceCategoryDetails
    ])
  ],
  providers: [PlacesService],
  controllers: [PlacesController]
})
export class PlacesModule {}
