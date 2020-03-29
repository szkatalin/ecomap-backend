import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BasePlace } from '../../place/model/base-place';
import { Address } from '../../place/model/address.entity';
import { Recommendation } from './recommendation.entity';
import { PlaceCategoryDetail } from '../../place/model/place-category-detail.entity';
import { OperationalEvent } from './operational-event.entity';

@Entity()
export class RecommendedPlace extends BasePlace {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Address })
  @OneToOne(
    () => Address,
    address => address.recommendedPlace
  )
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: PlaceCategoryDetail, isArray: true })
  @OneToMany(
    () => PlaceCategoryDetail,
    placeCategoryDetails => placeCategoryDetails.recommendedPlace,
    {
      cascade: true
    }
  )
  categoryDetails: PlaceCategoryDetail[];

  @ApiProperty({ type: () => Recommendation })
  @OneToOne(
    () => Recommendation,
    recommendation => recommendation.recommendedPlace,
    { cascade: true }
  )
  recommendation: Recommendation;
}
