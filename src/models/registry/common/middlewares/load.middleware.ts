import * as configs from '../../../../common/configs';
import * as services from '../../../../common/services';
import * as utils from '../../../../common/utils';
import mapper from '../mappers';

import { Injectable, type NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import get from 'lodash/get';

@Injectable()
export class LoadMiddleware implements NestMiddleware {
  async use(@Req() req, @Res() res: Response, @Next() next: NextFunction) {
    const { tin } = req.params;

    if (!tin) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
      const { data } = await services.http.request.get(`/process/register-extract/by-tin/${tin}`, {
        baseURL: configs.global.api.registry_base_url,
        headers: {
          Authorization: req.headers.authorization || ''
        }
      });

      const content = data;

      if (!content) {
        throw Error('Not found');
      }

      const registry = mapper(content || {}, {
        currentLanguage: res.getLocale(),
        host: configs.global.base_url
      });

      req.locals = { registry };
      return next();
    } catch (error) {
      const data = get(error, 'response.data');

      console.log('ERROR - REGISTRY');
      console.log('ERROR REQUEST', get(error, 'config.url'));
      console.log('ERROR RESPONSE', data);

      if (data) {
        return next(
          new utils.APIError({
            message: get(data, 'error'),
            status: get(data, 'status'),
            errors: '',
            stack: '',
            isPublic: false
          })
        );
      }

      return next(
        new utils.APIError({
          message: 'Not found',
          status: httpStatus.NOT_FOUND,
          errors: '',
          stack: '',
          isPublic: false
        })
      );
    }
  }
}
