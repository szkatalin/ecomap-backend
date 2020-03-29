import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRecommendedPlaceDto } from './create-recommended-place.dto';

export class CreateRecommendationDto {
  @ApiProperty({ type: () => CreateRecommendedPlaceDto })
  recommendedPlace: CreateRecommendedPlaceDto;

  @ApiPropertyOptional()
  comment?: string;
}
