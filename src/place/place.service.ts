import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPlacesFilterDto } from './dto/get-places-filter.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceRepository)
    private placeRepository: PlaceRepository
  ) {}

  async getAllPlaces(filterDto: GetPlacesFilterDto) {
    return await this.placeRepository.getAllPlaces(filterDto);
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
