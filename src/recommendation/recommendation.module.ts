import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from './model/recommendation.entity';
import { RecommendedPlace } from './model/recommended-place.entity';
import { RecommendationRepository } from './recommendation.repository';
import { UserModule } from '../user/user.module';
import { RecommendedPlaceRepository } from './recommended-place.repository';
import { OperationalEventRepository } from './operational-event.repository';
import { OperationalEvent } from './model/operational-event.entity';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recommendation,
      RecommendedPlace,
      OperationalEvent,
      RecommendationRepository,
      RecommendedPlaceRepository,
      OperationalEventRepository
    ]),
    UserModule,
    PlaceModule
  ],
  providers: [RecommendationService],
  controllers: [RecommendationController],
  exports: [RecommendationService]
})
export class RecommendationModule {}
