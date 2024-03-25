import * as configs from '../../common/configs';

import * as generators from './common/generators';

import { Injectable, Next, Req, Res } from '@nestjs/common';
import * as crypto from 'crypto';
import { NextFunction, Response } from 'express';
import * as fs from 'fs';
import get from 'lodash/get';
import * as path from 'path';

@Injectable()
export class ReceiptService {
  async getImage(@Req() req, @Res() res: Response) {
    const receipt = req.locals.receipt;
    const language = req.query.language || 'oz';
    const download = req.query.download !== undefined;

    const name = crypto
      .createHash('md5')
      .update(JSON.stringify(receipt) + language)
      .digest('hex');
    const dir =
      __dirname +
      path.sep +
      '..' +
      path.sep +
      'static' +
      path.sep +
      'receipt' +
      path.sep +
      name.substring(0, 2) +
      path.sep;

    const imagePath = dir + `${String(get(receipt, 'id'))}` + '-' + name + '.png';

    if (configs.global.env === 'production') {
      if (fs.existsSync(imagePath)) {
        if (download) {
          res.download(path.resolve(imagePath));
          return;
        }

        res.sendFile(path.resolve(imagePath));

        return;
      }
    }

    fs.mkdir(dir, { recursive: true }, err => {
      if (err) throw err;
    });

    const image = await generators.image({ output: imagePath, content: { receipt } });

    res.setHeader('Content-Type', 'image/png');
    if (download) {
      res.setHeader('Content-disposition', `attachment;filename=${name}.png`);
    }

    res.end(image, 'binary');
  }

  async getPdf(@Req() req, @Res() res: Response, @Next() next: NextFunction) {
    const receipt = req.locals.receipt;
    const language = req.query.language || 'oz';
    const download = req.query.download !== undefined;

    try {
      const name = crypto
        .createHash('md5')
        .update(JSON.stringify(receipt) + language)
        .digest('hex');
      const dir =
        __dirname +
        path.sep +
        '..' +
        path.sep +
        'static' +
        path.sep +
        'receipt' +
        path.sep +
        name.substring(0, 2) +
        path.sep;

      const filePath = dir + String(get(receipt, 'id')) + '-' + name + '.pdf';

      const file = await generators.pdf({
        dir,
        filePath: filePath,
        content: { receipt }
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
