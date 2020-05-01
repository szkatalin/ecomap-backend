import { EntityRepository, Repository } from 'typeorm';
import { Place } from './model/place.entity';
import { Recommendation } from '../recommendation/model/recommendation.entity';
import { GetPlacesFilterDto } from './dto/get-places-filter.dto';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  public async getAllPlaces(filterDto: GetPlacesFilterDto) {
    const { searchField, categories, types } = filterDto;
    const query = this.createQueryBuilder('place')
      .leftJoinAndSelect('place.address', 'address')
      .leftJoinAndSelect('place.categoryDetails', 'placeCategoryDetail');

    if (searchField) {
      query.andWhere(
        '(place.title LIKE :searchField OR place.description LIKE :searchField)',
        { searchField: `%${searchField}%` }
      );
    }

    if (categories) {
      const categoriesList = categories.split(',');
      for (const category of categoriesList) {
        query.andWhere('placeCategoryDetail.category = :category', {
          category,
        });
      }
    }

    if (types) {
      const typeList = types.split(',');
      for (const type of typeList) {
        query.andWhere(`:type = ANY (placeCategoryDetail.types)`, {
          type,
        });
      }
    }

    return query.getMany();
  }

  public async getPlaceById(id: number): Promise<Place> {
    return this.createQueryBuilder('place')
      .where('place.id = :id', { id })
      .leftJoinAndSelect('place.address', 'Address')
      .leftJoinAndSelect('place.categoryDetails', 'placeCategoryDetail')
      .getOne();
  }

  public async createOrUpdatePlace(recommendationId: number) {
    const recommendation = await this.manager
      .getRepository(Recommendation)
      .createQueryBuilder('recommendation')
      .leftJoinAndSelect('recommendation.recommendedPlace', 'recommendedPlace')
      .leftJoinAndSelect('recommendedPlace.address', 'Address')
      .leftJoinAndSelect('recommendedPlace.categoryDetails', 'CategoryDetails')
      .leftJoinAndSelect('recommendation.place', 'Place')
      .where('recommendation.id = :id', { id: recommendationId })
      .getOne();

    let place: Place;
    place = recommendation.place
      ? await this.getPlaceById(recommendation.place.id)
      : new Place();

    place.title = recommendation.recommendedPlace.title;
    place.description = recommendation.recommendedPlace.description;
    place.address = recommendation.recommendedPlace.address;
    place.categoryDetails = recommendation.recommendedPlace.categoryDetails;
    place.recommendations = place.recommendations
      ? [...place.recommendations, recommendation]
      : [recommendation];

    return place.save();
  }

  public async deletePlace(recommendationId: number) {
    const recommendation = await this.manager
      .getRepository(Recommendation)
      .createQueryBuilder('recommendation')
      .leftJoinAndSelect('recommendation.place', 'Place')
      .where('recommendation.id = :id', { id: recommendationId })
      .getOne();

    const place = await this.getPlaceById(recommendation.place.id);

    return place.remove();
  }
}
