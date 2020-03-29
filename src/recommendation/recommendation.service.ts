import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendationRepository } from './recommendation.repository';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendedPlaceRepository } from './recommended-place.repository';
import { CreateOperationalEventDto } from './dto/create-operational-event.dto';
import { OperationalEventRepository } from './operational-event.repository';
import { DecisionType } from './model/decision-type.enum';
import { PlaceService } from '../place/place.service';
import { OperationalEvent } from './model/operational-event.entity';
import { OperationType } from './model/operation-type.enum';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(RecommendationRepository)
    private readonly recommendationRepository: RecommendationRepository,
    @InjectRepository(RecommendedPlaceRepository)
    private readonly recommendedPlaceRepository: RecommendedPlaceRepository,
    @InjectRepository(OperationalEventRepository)
    private readonly operationalEventRepository: OperationalEventRepository,
    private placeService: PlaceService
  ) {}

  async getAllRecommendations() {
    return await this.recommendationRepository.getAllRecommendations();
  }

  async getRecommendationById(recommendationId: number) {
    return await this.recommendationRepository.getRecommendationById(
      recommendationId
    );
  }

  async createPlaceRecommendation(
    userId: string,
    recommendationDto: CreateRecommendationDto,
    placeId?: number
  ) {
    let recommendedPlace = await this.recommendedPlaceRepository.createRecommendedPlace(
      recommendationDto.recommendedPlace
    );

    return await this.recommendationRepository.createPlaceRecommendation(
      userId,
      recommendationDto,
      recommendedPlace,
      placeId
    );
  }

  async deletePlaceRecommendation(
    userId: string,
    placeId: number,
    comment: string
  ) {
    return await this.recommendationRepository.deletePlaceRecommendation(
      userId,
      placeId,
      comment
    );
  }

  async evaluateRecommendation(
    recommendationId: number,
    userId: string,
    createOperationalEventDto: CreateOperationalEventDto
  ): Promise<OperationalEvent> {
    let operationalEvent: OperationalEvent;
    const isRecommendationEvaluated = await this.operationalEventRepository.isRecommendationEvaluated(
      recommendationId
    );
    if (!isRecommendationEvaluated) {
      operationalEvent = await this.operationalEventRepository.createOperationalEvent(
        recommendationId,
        userId,
        createOperationalEventDto
      );

      if (operationalEvent.decision === DecisionType.ACCEPT) {
        if (
          operationalEvent.recommendation.operationType !==
          OperationType.DELETE_REQUEST
        ) {
          await this.placeService.createOrUpdatePlace(recommendationId);
        } else {
          await this.placeService.deletePlace(recommendationId);
        }
      }
    } else {
      operationalEvent = await this.operationalEventRepository.getOperationalEventByRecommendationId(
        recommendationId
      );
    }

    return operationalEvent;
  }
}
