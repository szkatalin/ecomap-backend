import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BasePlace } from './base-place';
import { PlaceCategoryDetail } from './place-category-detail.entity';
import { Address } from './address.entity';
import { Recommendation } from '../../recommendation/model/recommendation.entity';

@Entity()
export class Place extends BasePlace {
  @ApiProperty({ type: Address })
  @OneToOne(
    () => Address,
    address => address.place
  )
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: PlaceCategoryDetail, isArray: true })
  @OneToMany(
    () => PlaceCategoryDetail,
    placeCategoryDetails => placeCategoryDetails.place,
    { cascade: true }
  )
  categoryDetails: PlaceCategoryDetail[];

  @ApiProperty({ type: Recommendation, isArray: true })
  @OneToMany(
    () => Recommendation,
    recommendations => recommendations.place,
    { cascade: true }
  )
  recommendations: Recommendation[];
}
