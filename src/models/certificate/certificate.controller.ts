import { CertificateService } from './certificate.service';

import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('uuid/:uuid/image')
  getImageByUUid(@Req() req: Request, @Res() res: Response) {
    return this.certificateService.getImage(req, res);
  }

  @Get('uuid/:uuid/pdf')
  getPdfByUUid(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.certificateService.getPdf(req, res, next);
  }

  @Get('id/:id/image')
  getImageById(@Req() req: Request, @Res() res: Response) {
    return this.certificateService.getImage(req, res);
  }

  @Get('/id/:id/pdf')
  getPdfById(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.certificateService.getPdf(req, res, next);
  }
}
