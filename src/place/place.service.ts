import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceRepository)
    private placeRepository: PlaceRepository
  ) {}

  async getAllPlaces() {
    return await this.placeRepository.getAllPlaces();
  }

  async getPlaceById(id: number) {
    return await this.placeRepository.getPlaceById(id);
  }

  async createOrUpdatePlace(recommendationId: number) {
    return await this.placeRepository.createOrUpdatePlace(recommendationId);
  }

  async deletePlace(recommendationId: number) {
    return await this.placeRepository.deletePlace(recommendationId);
  }
}
