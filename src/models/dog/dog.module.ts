import { DogController } from './dog.controller';
import { DogService } from './dog.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
