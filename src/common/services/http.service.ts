import * as configs from '../configs';

import axios from 'axios';

const request = axios.create({
  baseURL: configs.global.api.base_url,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  },
  params: {}
});

export default { request };
