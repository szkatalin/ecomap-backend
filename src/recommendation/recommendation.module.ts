import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';

@Module({
  providers: [RecommendationService],
  controllers: [RecommendationController]
})
export class RecommendationModule {}
