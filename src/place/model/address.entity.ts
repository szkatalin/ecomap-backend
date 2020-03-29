import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Place } from './place.entity';
import { RecommendedPlace } from '../../recommendation/model/recommended-place.entity';

@Entity()
export class Address extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  postalCode: number;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty({ type: [Number] })
  @Column('float', { array: true, nullable: true })
  coordinates?: number[];

  @OneToOne(
    () => Place,
    place => place.address
  )
  place: Place;

  @ManyToOne(
    () => RecommendedPlace,
    recommendedPlace => recommendedPlace.address
  )
  recommendedPlace: RecommendedPlace;
}
