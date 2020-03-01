import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Address} from "./address.entity";
import {Place} from "./place.entity";
import {PlaceStatus} from "./place-status.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Place, Address, PlaceStatus])],
  providers: [PlacesService],
  controllers: [PlacesController]
})
export class PlacesModule {}
