import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  public root(): string {
    return 'Backend is running! Hurray!!!!';
  }
}
