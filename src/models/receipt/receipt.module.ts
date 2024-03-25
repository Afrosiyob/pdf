import * as Middlewares from './common/middlewares';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService]
})
export class ReceiptModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middlewares.LoadMiddleware).forRoutes(ReceiptController);
  }
}
