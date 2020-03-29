import { EntityRepository, Repository } from 'typeorm';
import { Place } from './model/place.entity';
import { Recommendation } from '../recommendation/model/recommendation.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  async getAllPlaces() {
    return await this.createQueryBuilder('place')
      .leftJoinAndSelect('place.address', 'Address')
      .getMany();
  }

  async getPlaceById(id: number): Promise<Place> {
    return await this.createQueryBuilder('place')
      .where('place.id = :id', { id: id })
      .leftJoinAndSelect('place.address', 'Address')
      .getOne();
  }

  async createOrUpdatePlace(recommendationId: number) {
    const recommendation = await this.manager
      .getRepository(Recommendation)
      .createQueryBuilder('recommendation')
      .leftJoinAndSelect('recommendation.recommendedPlace', 'RecommendedPlace')
      .leftJoinAndSelect('recommendedPlace.address', 'Address')
      .leftJoinAndSelect('recommendedPlace.categoryDetails', 'CategoryDetails')
      .leftJoinAndSelect('recommendation.place', 'Place')
      .where('recommendation.id = :id', { id: recommendationId })
      .getOne();

    let place: Place;
    if (recommendation.place) {
      place = await this.getPlaceById(recommendation.place.id);
    } else {
      place = new Place();
    }

    place.title = recommendation.recommendedPlace.title;
    place.description = recommendation.recommendedPlace.description;
    place.address = recommendation.recommendedPlace.address;
    place.categoryDetails = recommendation.recommendedPlace.categoryDetails;
    place.recommendations = place.recommendations
      ? [...place.recommendations, recommendation]
      : [recommendation];

    return await place.save();
  }

  async deletePlace(recommendationId: number) {
    const recommendation = await this.manager
      .getRepository(Recommendation)
      .createQueryBuilder('recommendation')
      .leftJoinAndSelect('recommendation.place', 'Place')
      .where('recommendation.id = :id', { id: recommendationId })
      .getOne();

    const place = await this.getPlaceById(recommendation.place.id);

    return await place.remove();
  }
}
