import { ApiProperty } from '@nestjs/swagger';
import { PlaceCategory } from '../model/place-category.enum';
import { CategoryTypes } from '../model/category-types.enum';

export class CreatePlaceCategoryDetailDto {
  @ApiProperty({ enum: Object.keys(PlaceCategory) })
  category: PlaceCategory;

  @ApiProperty({ enum: Object.keys(CategoryTypes), isArray: true })
  types?: CategoryTypes[];
}
