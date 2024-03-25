import * as Middlewares from './common/middlewares';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';

import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';

@Module({
  controllers: [RegistryController],
  providers: [RegistryService]
})
export class RegistryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middlewares.LoadMiddleware).forRoutes(RegistryController);
  }
}
