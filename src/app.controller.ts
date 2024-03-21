import { AppService } from './app.service';

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hi')
  getHi(): string {
    return this.appService.getHi();
  }

  @Get('/cat')
  getCat(): string {
    return this.appService.getCat();
  }
}
