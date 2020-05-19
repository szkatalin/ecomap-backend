import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { Role } from './role.enum';
import { OperationalEvent } from '../../recommendation/model/operational-event.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Recommendation } from '../../recommendation/model/recommendation.entity';

@Entity()
@Unique(['id'])
export class User {
  @ApiProperty()
  @PrimaryColumn({ type: 'text' })
  id: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(
    () => OperationalEvent,
    (operationEvents) => operationEvents.reviewerUser
  )
  operationalEvents: OperationalEvent[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.referralUser
  )
  recommendations: Recommendation[];
}
