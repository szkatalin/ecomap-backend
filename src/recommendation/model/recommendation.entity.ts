import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OperationalEvent } from './operational-event.entity';
import { User } from '../../user/model/user.entity';
import { OperationType } from './operation-type.enum';
import { RecommendedPlace } from './recommended-place.entity';
import { Place } from '../../place/model/place.entity';

@Entity()
export class Recommendation extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.recommendations)
  referralUser: User;

  @ApiProperty()
  @Column('timestamp')
  dateTime: Date;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  comment?: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: OperationType })
  operationType: OperationType;

  @ApiProperty({ type: () => RecommendedPlace })
  @OneToOne(
    () => RecommendedPlace,
    (recommendedPlace) => recommendedPlace.recommendation
  )
  @JoinColumn()
  recommendedPlace: RecommendedPlace;

  @ApiProperty({ type: () => Place })
  @ManyToOne(() => Place, (place) => place.recommendations, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  place: Place;

  @ApiProperty({ type: OperationalEvent })
  @OneToOne(
    () => OperationalEvent,
    (operationalEvent) => operationalEvent.recommendation
  )
  operationalEvent: OperationalEvent;

  @BeforeInsert()
  updateDateTime() {
    this.dateTime = new Date();
  }
}
