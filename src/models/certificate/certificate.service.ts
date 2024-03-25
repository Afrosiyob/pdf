import * as generators from './common/generators';

import { Injectable, Next, Req, Res } from '@nestjs/common';
import * as crypto from 'crypto';
import { NextFunction, Response } from 'express';
import get from 'lodash/get';
import path from 'path';

@Injectable()
export class CertificateService {
  async getImage(@Req() req, @Res() res: Response) {
    const certificate = req.locals.certificate;
    const language = req.query.language || 'oz';
    const download = req.query.download !== undefined;
    const page = req.query.page || 'main';

    const name = crypto
      .createHash('md5')
      .update(JSON.stringify(certificate) + language)
      .digest('hex');
    const dir =
      __dirname +
      path.sep +
      '..' +
      path.sep +
      'static' +
      path.sep +
      'certificate' +
      path.sep +
      name.substring(0, 2) +
      path.sep;

    const imagePath = dir + `${String(get(certificate, 'id'))}-${page}` + '-' + name + '.png';

    let view = 'index.html';

    switch (page) {
      case 'specializations':
        view = 'specializations.html';
        break;
      case 'main':
      default:
        view = 'index.html';
    }

    const image = await generators.image({
      dir,
      filePath: imagePath,
      content: { certificate },
      view
    });

    res.setHeader('Content-Type', 'image/png');
    if (download) {
      res.setHeader('Content-disposition', `attachment;filename=${name}-${page}.png`);
    }

    res.sendFile(path.resolve(image));
  }

  async getPdf(@Req() req, @Res() res: Response, @Next() next: NextFunction) {
    const certificate = req.locals.certificate;
    const language = req.query.language || 'oz';
    const download = req.query.download !== undefined;

    try {
      const name = crypto
        .createHash('md5')
        .update(JSON.stringify(certificate) + language)
        .digest('hex');
      const dir =
        __dirname +
        path.sep +
        '..' +
        path.sep +
        'static' +
        path.sep +
        'certificate' +
        path.sep +
        name.substring(0, 2) +
        path.sep;

      const filePath = dir + String(get(certificate, 'id')) + '-' + name + '.pdf';

      const file = await generators.pdf({
        dir,
        filePath: filePath,
        content: { certificate }
      });

      if (download) {
        res.download(path.resolve(file));
        return;
      }

      res.sendFile(path.resolve(file));
    } catch (error) {
      return next(error);
    }
  }
}
