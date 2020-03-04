import { Body, Controller, Get } from '@nestjs/common';
import { Place } from './places/model/place.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  public root(@Body() place: Place): string {
    return 'Backend is running! Hurray!!!!';
  }

  @Get('test')
  public test() {
    return this.appService.test();
  }
}
