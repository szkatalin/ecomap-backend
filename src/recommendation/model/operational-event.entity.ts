import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/model/user.entity';
import { IsOptional } from 'class-validator';
import { DecisionType } from './decision-type.enum';
import { Recommendation } from './recommendation.entity';

@Entity()
export class OperationalEvent extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Recommendation })
  @OneToOne(
    () => Recommendation,
    recommendation => recommendation.operationalEvent
  )
  @JoinColumn()
  recommendation: Recommendation;

  @ApiProperty()
  @Column('timestamp')
  dateTime: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(
    () => User,
    user => user.operationalEvents
  )
  reviewerUser: User;

  @ApiProperty()
  @Column({ type: 'enum', enum: DecisionType })
  decision: DecisionType;

  @ApiProperty()
  @Column()
  @IsOptional()
  comment?: string;

  @BeforeInsert()
  updateDateTime() {
    this.dateTime = new Date();
  }
}
