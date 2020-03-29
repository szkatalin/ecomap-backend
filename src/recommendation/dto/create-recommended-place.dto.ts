import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../../place/dto/create-address.dto';
import { CreatePlaceCategoryDetailDto } from '../../place/dto/create-place-category-detail.dto';

export class CreateRecommendedPlaceDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  address: CreateAddressDto;

  @ApiProperty({ type: () => CreatePlaceCategoryDetailDto, isArray: true })
  placeCategoryDetails: CreatePlaceCategoryDetailDto[];
}
