import { Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PlaceOperationalEvent } from '../../recommendation/model/place-operational-event.entity';
import { BasePlace } from './base-place.entity';

@Entity()
export class Place extends BasePlace {
  @ApiProperty({ type: PlaceOperationalEvent, isArray: true })
  @OneToMany(
    () => PlaceOperationalEvent,
    operationalEvents => operationalEvents.place
  )
  operationalEvents: PlaceOperationalEvent[];
}
