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
  addressId: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @OneToMany(
    () => PlaceCategoryDetails,
    placeCategoryDetails => placeCategoryDetails.place
  )
  category: PlaceCategoryDetails;

  @OneToMany(
    () => PlaceOperationalEvent,
    operationalEvents => operationalEvents.place
  )
  operationalEvents: PlaceOperationalEvent[];
}
