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
  @Column('enum', { enum: PlaceCategory })
  category: PlaceCategory;

  @ApiProperty({ enum: Object.keys(CategoryTypes), isArray: true })
  @Column('enum', { enum: CategoryTypes, array: true, nullable: true })
  types: CategoryTypes[];

  @ManyToOne(() => Place, (place) => place.categoryDetails, {
    onDelete: 'CASCADE',
  })
  place: Place;

  @ManyToOne(
    () => RecommendedPlace,
    (recommendedPlace) => recommendedPlace.categoryDetails
  )
  recommendedPlace: RecommendedPlace;
}
