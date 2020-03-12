import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BasePlace } from '../../place/model/base-place.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PlaceOperationalEvent } from './place-operational-event.entity';
import { User } from '../../user/model/user.entity';
import { OperationType } from './operation-type.enum';

@Entity()
export class Recommendation extends BasePlace {
  @ApiProperty()
  @ManyToOne(
    () => User,
    user => user.placeOperationEvents
  )
  referralUser: User;

  @ApiProperty()
  @Column('timestamp')
  dateTime: Date;

  @ApiProperty()
  @Column({ type: 'enum', enum: OperationType })
  operationType: OperationType;

  @ApiProperty({ type: () => PlaceOperationalEvent })
  @OneToOne(
    () => PlaceOperationalEvent,
    placeOperationalEvent => placeOperationalEvent.recommendation
  )
  placeOperationalEvent: PlaceOperationalEvent;
}
