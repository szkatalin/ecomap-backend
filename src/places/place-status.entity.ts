import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlaceStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
