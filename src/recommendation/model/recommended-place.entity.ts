import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../place/model/address.entity';
import { Recommendation } from './recommendation.entity';
import { PlaceCategoryDetail } from '../../place/model/place-category-detail.entity';

@Entity()
export class RecommendedPlace extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: () => Address })
  @OneToOne(() => Address, (address) => address.recommendedPlace)
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: () => PlaceCategoryDetail, isArray: true })
  @OneToMany(
    () => PlaceCategoryDetail,
    (placeCategoryDetails) => placeCategoryDetails.recommendedPlace,
    {
      cascade: true,
    }
  )
  categoryDetails: PlaceCategoryDetail[];

  @OneToOne(
    () => Recommendation,
    (recommendation) => recommendation.recommendedPlace,
    { cascade: true }
  )
  recommendation: Recommendation;
}
