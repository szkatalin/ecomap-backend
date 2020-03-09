import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { Role } from './role.enum';
import { PlaceOperationalEvent } from '../../place/model/place-operational-event.entity';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

@Entity()
@Unique(['id'])
export class User {
  @ApiProperty()
  @PrimaryColumn({ type: 'text' })
  id: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @ApiProperty()
  @OneToMany(
    () => PlaceOperationalEvent,
    placeOperationEvents => placeOperationEvents.user
  )
  placeOperationEvents: PlaceOperationalEvent[];
}
