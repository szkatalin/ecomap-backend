import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { PlaceCategory } from "./place-category.enum";
import { Address } from "./address.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Place extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ type: Address })
  @OneToOne(
    type => Address,
    address => address.place,
    { eager: false }
  )
  address: Address;

  @ApiProperty()
  @Column()
  addressId: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ enum: Object.values(PlaceCategory) })
  @Column({
    type: "enum",
    enum: PlaceCategory,
    default: PlaceCategory.OTHER
  })
  category: PlaceCategory;
}
