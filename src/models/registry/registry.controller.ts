import { RegistryService } from './registry.service';

import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get('tin/:tin/pdf')
  getPdf(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.registryService.getPdf(req, res, next);
  }
}
