import { CatController } from './cat.controller';
import { CatService } from './cat.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
