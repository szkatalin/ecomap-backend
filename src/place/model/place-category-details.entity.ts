import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PlaceCategory } from './place-category.enum';
import { CategoryTypes } from './category-types.enum';
import { Place } from './place.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PlaceCategoryDetails extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: Object.keys(PlaceCategory) })
  @Column({ type: 'enum', enum: PlaceCategory })
  category: PlaceCategory;

  @ApiProperty({ enum: Object.keys(CategoryTypes), isArray: true })
  @Column({ type: 'enum', enum: CategoryTypes, array: true })
  types: CategoryTypes[];

  @OneToMany(
    () => Place,
    place => place.categoryDetails
  )
  place: Place;
}
