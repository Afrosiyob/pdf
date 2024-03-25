import * as Middlewares from './common/middlewares';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';

import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService]
})
export class CertificateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middlewares.LoadByUUidMiddleware).forRoutes(
      {
        path: 'certificate/uuid/:uuid/image',
        method: RequestMethod.GET
      },
      {
        path: 'certificate/uuid/:uuid/pdf',
        method: RequestMethod.GET
      }
    );
    consumer.apply(Middlewares.LoadByIdMiddleware).forRoutes(
      {
        path: 'certificate/id/:id/image',
        method: RequestMethod.GET
      },
      {
        path: 'certificate/id/:id/pdf',
        method: RequestMethod.GET
      }
    );
  }
}
