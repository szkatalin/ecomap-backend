import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './model/address.entity';
import { Place } from './model/place.entity';
import { PlaceCategoryDetail } from './model/place-category-detail.entity';
import { UserModule } from '../user/user.module';
import { PlaceRepository } from './place.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Place,
      Address,
      PlaceCategoryDetail,
      PlaceRepository
    ]),
    UserModule
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService]
})
export class PlaceModule {}
