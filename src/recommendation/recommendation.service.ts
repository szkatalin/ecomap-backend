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
import { UserService } from '../user/user.service';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(RecommendationRepository)
    private readonly recommendationRepository: RecommendationRepository,
    @InjectRepository(RecommendedPlaceRepository)
    private readonly recommendedPlaceRepository: RecommendedPlaceRepository,
    @InjectRepository(OperationalEventRepository)
    private readonly operationalEventRepository: OperationalEventRepository,
    private placeService: PlaceService,
    private userService: UserService
  ) {}

  public async getAllRecommendations() {
    return this.recommendationRepository.getAllRecommendations();
  }

  public async getRecommendationById(recommendationId: number) {
    return this.recommendationRepository.getRecommendationById(
      recommendationId
    );
  }

  public async createPlaceRecommendation(
    userId: string,
    recommendationDto: CreateRecommendationDto,
    placeId?: number
  ) {
    const user = await this.userService.getUserById(userId);

    const recommendedPlace = await this.recommendedPlaceRepository.createRecommendedPlace(
      recommendationDto.recommendedPlace
    );

    console.log(recommendedPlace);

    return this.recommendationRepository.createPlaceRecommendation(
      user,
      recommendationDto,
      recommendedPlace,
      placeId
    );
  }

  public async deletePlaceRecommendation(
    userId: string,
    placeId: number,
    comment: string
  ) {
    return this.recommendationRepository.deletePlaceRecommendation(
      userId,
      placeId,
      comment
    );
  }

  public async evaluateRecommendation(
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

  getRecommendationsForUser(userId: string) {
    return this.recommendationRepository.getRecommendationsForUser(userId);
  }
}
