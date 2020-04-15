import { EntityRepository, Repository } from 'typeorm';
import { RecommendedPlace } from './model/recommended-place.entity';
import { CreateRecommendedPlaceDto } from './dto/create-recommended-place.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PlaceCategoryDetail } from '../place/model/place-category-detail.entity';
import { Address } from '../place/model/address.entity';

@Injectable()
@EntityRepository(RecommendedPlace)
export class RecommendedPlaceRepository extends Repository<RecommendedPlace> {
  async getAllRecommendedPlaces(): Promise<RecommendedPlace[]> {
    return await this.manager
      .createQueryBuilder()
      .select()
      .from(RecommendedPlace, 'recommended_place')
      .getMany();
  }

  async createRecommendedPlace(
    recommendedPlaceDto: CreateRecommendedPlaceDto
  ): Promise<RecommendedPlace> {
    try {
      const recommendedPlace = new RecommendedPlace();

      recommendedPlace.title = recommendedPlaceDto.title;
      recommendedPlace.description = recommendedPlaceDto.description;

      let address = new Address();
      address.city = recommendedPlaceDto.address.city;
      address.country = recommendedPlaceDto.address.country;
      address.postalCode = recommendedPlaceDto.address.postalCode;
      address.streetAddress = recommendedPlaceDto.address.streetAddress;
      address.coordinates = recommendedPlaceDto.address.coordinates;

      recommendedPlace.address = await address.save();

      let categoryDetails: PlaceCategoryDetail[] = [];
      recommendedPlaceDto.placeCategoryDetails.map(async (detail) => {
        let categoryDetail = new PlaceCategoryDetail();

        categoryDetail.category = detail.category;
        categoryDetail.types = detail.types;

        categoryDetails.push(categoryDetail);
      });

      recommendedPlace.categoryDetails = categoryDetails;

      return await recommendedPlace.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
