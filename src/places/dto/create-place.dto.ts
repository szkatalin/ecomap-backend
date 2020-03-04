import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Address } from '../model/address.entity';
import { PlaceCategoryDetails } from '../model/place-category-details.entity';

@ApiExtraModels()
export class CreatePlaceDto {
  // @ApiProperty()
  // title: string;
  //
  // @ApiProperty()
  // address: Address;
  //
  // @ApiProperty()
  // addressId: number;
  //
  // @ApiProperty()
  // description: string;
  //
  // @ApiProperty()
  // category: PlaceCategoryDetails;
}
