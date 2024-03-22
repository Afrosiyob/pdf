import { DogController } from './dog.controller';
import { DogService } from './dog.service';

import { Test, type TestingModule } from '@nestjs/testing';

describe('DogController', () => {
  let controller: DogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogController],
      providers: [DogService],
    }).compile();

    controller = module.get<DogController>(DogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
