import { Controller, Get } from '@nestjs/common';

@Controller('places')
export class PlacesController {
  constructor() {}

  @Get()
  async test() {
    return 'protected';
  }
}
