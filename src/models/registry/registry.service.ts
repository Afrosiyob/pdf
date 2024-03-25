import * as generators from './common/generators';

import { Injectable, Next, Req, Res } from '@nestjs/common';
import * as crypto from 'crypto';
import { NextFunction, Response } from 'express';
import get from 'lodash/get';
import * as path from 'path';

@Injectable()
export class RegistryService {
  async getPdf(@Req() req, @Res() res: Response, @Next() next: NextFunction) {
    const registry = req.locals.registry;
    const language = req.query.language || 'oz';
    const download = req.query.download !== undefined;

    try {
      const name = crypto
        .createHash('md5')
        .update(JSON.stringify(registry) + language)
        .digest('hex');
      const dir =
        __dirname +
        path.sep +
        '..' +
        path.sep +
        'static' +
        path.sep +
        'registry' +
        path.sep +
        name.substring(0, 2) +
        path.sep;

      const filePath = dir + String(get(registry, 'id')) + '-' + name + '.pdf';

      const file = await generators.pdf({
        dir,
        filePath: filePath,
        content: { registry }
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
