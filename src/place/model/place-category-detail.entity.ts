import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceCategory } from './place-category.enum';
import { CategoryTypes } from './category-types.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Place } from './place.entity';
import { RecommendedPlace } from '../../recommendation/model/recommended-place.entity';

@Entity()
export class PlaceCategoryDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: Object.keys(PlaceCategory) })
  @Column({ type: 'enum', enum: PlaceCategory })
  category: PlaceCategory;

  @ApiProperty({ enum: Object.keys(CategoryTypes), isArray: true })
  @Column({ type: 'enum', enum: CategoryTypes, array: true })
  types: CategoryTypes[];

  @ApiProperty({ type: () => Place })
  @ManyToOne(
    () => Place,
    place => place.categoryDetails
  )
  place: Place;

  @ApiProperty({ type: () => RecommendedPlace })
  @ManyToOne(
    () => RecommendedPlace,
    recommendedPlace => recommendedPlace.categoryDetails
  )
  recommendedPlace: RecommendedPlace;
}
