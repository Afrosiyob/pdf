import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

import { Test, type TestingModule } from '@nestjs/testing';

describe('ReceiptController', () => {
  let controller: ReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptController],
      providers: [ReceiptService]
    }).compile();

    controller = module.get<ReceiptController>(ReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
