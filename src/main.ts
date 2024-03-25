import * as config from './common/configs';
import * as service from './common/services';
import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'], // changed terminal log
    cors: true
  });

  // request logging. dev: console | production: file
  app.use(morgan(config.global.logs));

  // set security HTTP headers
  app.use(helmet());

  // languages translations
  app.use(service.i18n.init);

  await app.listen(3000);
}
bootstrap();
