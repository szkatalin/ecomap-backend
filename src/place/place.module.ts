import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './model/address.entity';
import { Place } from './model/place.entity';
import { PlaceOperationalEvent } from './model/place-operational-event.entity';
import { PlaceCategoryDetails } from './model/place-category-details.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Place,
      Address,
      PlaceOperationalEvent,
      PlaceCategoryDetails
    ]),
    UserModule
  ],
  providers: [PlaceService],
  controllers: [PlaceController]
})
export class PlaceModule {}
