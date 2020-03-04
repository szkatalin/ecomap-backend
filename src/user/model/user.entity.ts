import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { Role } from './role.enum';
import { PlaceOperationalEvent } from '../../places/model/place-operational-event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['id'])
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ApiProperty()
  @OneToMany(
    () => PlaceOperationalEvent,
    placeOperationEvents => placeOperationEvents.user
  )
  placeOperationEvents: PlaceOperationalEvent[];
}
