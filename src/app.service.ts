import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHi(): string {
    return 'Hi';
  }
  getCat(): string {
    return 'Get Cat';
  }
}
