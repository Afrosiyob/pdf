import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DogController } from './models/dog/dog.controller';
import { DogModule } from './models/dog/dog.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';

@Module({
  imports: [DogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.ALL }); special method for request

    consumer.apply(LoggerMiddleware).forRoutes(DogController);
  }
}
