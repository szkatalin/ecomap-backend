import { EntityRepository, Repository } from 'typeorm';
import { Recommendation } from './model/recommendation.entity';
import { OperationType } from './model/operation-type.enum';
import { RecommendedPlace } from './model/recommended-place.entity';
import { User } from '../user/model/user.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { Place } from '../place/model/place.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Recommendation)
export class RecommendationRepository extends Repository<Recommendation> {
  async getAllRecommendations() {
    return await this.createQueryBuilder('recommendation')
      .leftJoinAndSelect('recommendation.recommendedPlace', 'recommendedPlace')
      .leftJoinAndSelect('recommendedPlace.address', 'Address')
      .leftJoinAndSelect('recommendedPlace.categoryDetails', 'CategoryDetails')
      .leftJoinAndSelect('recommendation.place', 'Place')
      .getMany();
  }

  async getRecommendationById(recommendationId: number) {
    return await this.createQueryBuilder('recommendation')
      .leftJoinAndSelect('recommendation.recommendedPlace', 'recommendedPlace')
      .leftJoinAndSelect('recommendedPlace.address', 'Address')
      .leftJoinAndSelect('recommendedPlace.categoryDetails', 'CategoryDetails')
      .leftJoinAndSelect('recommendation.place', 'Place')
      .whereInIds(recommendationId)
      .getOne();
  }

  async createPlaceRecommendation(
    userId: string,
    recommendationDto: CreateRecommendationDto,
    recommendedPlace: RecommendedPlace,
    placeId?: number
  ) {
    const user = await this.manager.getRepository(User).findOne({ id: userId });
    const recommendation = new Recommendation();

    recommendation.referralUser = user;
    recommendation.recommendedPlace = recommendedPlace;
    recommendation.comment = recommendationDto.comment;

    if (placeId) {
      recommendation.operationType = OperationType.MODIFY_REQUEST;
      recommendation.place = await this.manager
        .getRepository(Place)
        .findOne({ id: placeId });

      if (!recommendation.place) {
        throw new NotFoundException('Place was not found');
      }
    } else {
      recommendation.operationType = OperationType.RECOMMENDATION;
    }

    return await recommendation.save();
  }

  async deletePlaceRecommendation(
    userId: string,
    placeId: number,
    comment: string
  ) {
    const user = await this.manager.getRepository(User).findOne({ id: userId });
    const recommendation = new Recommendation();

    recommendation.referralUser = user;
    recommendation.recommendedPlace = null;
    recommendation.comment = comment;
    recommendation.place = await this.manager
      .getRepository(Place)
      .findOne({ id: placeId });
    recommendation.operationType = OperationType.DELETE_REQUEST;

    return await recommendation.save();
  }
}
