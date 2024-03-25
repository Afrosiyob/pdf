import { ReceiptService } from './receipt.service';

import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get('id/:id/image')
  getImage(@Req() req: Request, @Res() res: Response) {
    return this.receiptService.getImage(req, res);
  }

  @Get('id/:id/pdf')
  getPdf(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.receiptService.getPdf(req, res, next);
  }
}
