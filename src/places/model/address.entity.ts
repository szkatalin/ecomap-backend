import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Place } from "./place.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Address extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  postalCode: number;

  @ApiProperty()
  @Column()
  city: string;

  @OneToOne(
    type => Place,
    place => place.address,
    { eager: true }
  )
  place: Place;
}
