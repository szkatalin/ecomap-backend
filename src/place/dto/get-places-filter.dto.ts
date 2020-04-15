import { IsOptional } from 'class-validator';

export class GetPlacesFilterDto {
  @IsOptional()
  searchField: string;

  @IsOptional()
  categories: string;

  @IsOptional()
  types: string;
}
