import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/model/user.entity';
import { OperationType } from './operation-type.enum';
import { Place } from './place.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class PlaceOperationalEvent extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(
    () => User,
    user => user.placeOperationEvents
  )
  user: User;

  @ApiProperty()
  @Column('timestamp')
  dateTime: Date;

  @ApiProperty()
  @Column({ type: 'enum', enum: OperationType })
  operationType: OperationType;

  @ApiProperty({ type: () => Place })
  @ManyToOne(
    () => Place,
    place => place.operationalEvents
  )
  place: Place;

  @ApiProperty()
  @Column()
  @IsOptional()
  comment?: string;
}
