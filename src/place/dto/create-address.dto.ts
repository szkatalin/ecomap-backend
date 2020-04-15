import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  postalCode: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  streetAddress: string;

  @ApiProperty({ type: [Number] })
  coordinates?: number[];
}
