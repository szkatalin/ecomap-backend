import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/model/user.entity';
import { OperationType } from './operation-type.enum';
import { Place } from '../../place/model/place.entity';
import { IsOptional } from 'class-validator';
import { DecisionType } from './decision-type.enum';
import { Recommendation } from './recommendation.entity';

@Entity()
export class PlaceOperationalEvent extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Place })
  @ManyToOne(
    () => Place,
    place => place.operationalEvents
  )
  place?: Place;

  @ApiProperty({ type: () => Recommendation })
  @OneToOne(
    () => Recommendation,
    recommendation => recommendation.placeOperationalEvent
  )
  recommendation: Recommendation;

  @ApiProperty()
  @Column('timestamp')
  dateTime: Date;

  @ApiProperty()
  @ManyToOne(
    () => User,
    user => user.placeOperationEvents
  )
  reviewerUser: User;

  @ApiProperty()
  @Column({ type: 'enum', enum: DecisionType })
  decision: DecisionType;

  @ApiProperty()
  @Column()
  @IsOptional()
  comment?: string;
}
