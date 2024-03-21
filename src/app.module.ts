import { CatModule } from './cat/cat.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
