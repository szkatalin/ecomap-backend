import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DecisionType } from '../model/decision-type.enum';

export class CreateOperationalEventDto {
  @ApiProperty({ type: DecisionType, enum: Object.keys(DecisionType) })
  decision: DecisionType;

  @ApiPropertyOptional()
  comment?: string;
}
