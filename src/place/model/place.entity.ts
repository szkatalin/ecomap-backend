import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Address } from './address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PlaceCategoryDetails } from './place-category-details.entity';
import { PlaceOperationalEvent } from './place-operational-event.entity';

@Entity()
export class Place extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ type: Address })
  @OneToOne(
    () => Address,
    address => address.place,
    { eager: false }
  )
  @JoinColumn()
  address: Address;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: PlaceCategoryDetails })
  @OneToMany(
    () => PlaceCategoryDetails,
    placeCategoryDetails => placeCategoryDetails.place
  )
  categoryDetails: PlaceCategoryDetails;

  @ApiProperty({ type: PlaceOperationalEvent, isArray: true })
  @OneToMany(
    () => PlaceOperationalEvent,
    operationalEvents => operationalEvents.place
  )
  operationalEvents: PlaceOperationalEvent[];
}
