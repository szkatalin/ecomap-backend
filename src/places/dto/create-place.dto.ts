import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../address.entity";
import { PlaceCategory } from "../place-category.enum";

export class CreatePlaceDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    address: Address;

    @ApiProperty()
    addressId: number;

    @ApiProperty()
    description: string;

    @ApiProperty({ enum: Object.values(PlaceCategory) })
    category: PlaceCategory;
}
