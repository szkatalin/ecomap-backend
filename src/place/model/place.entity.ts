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
import { PlaceCategoryDetail } from './place-category-detail.entity';
import { Address } from './address.entity';
import { Recommendation } from '../../recommendation/model/recommendation.entity';

@Entity()
export class Place extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: Address })
  @OneToOne(() => Address, (address) => address.place, { onDelete: 'CASCADE' })
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: PlaceCategoryDetail, isArray: true })
  @OneToMany(
    () => PlaceCategoryDetail,
    (placeCategoryDetails) => placeCategoryDetails.place,
    { onDelete: 'CASCADE' }
  )
  categoryDetails: PlaceCategoryDetail[];

  @OneToMany(() => Recommendation, (recommendations) => recommendations.place)
  recommendations: Recommendation[];
}
