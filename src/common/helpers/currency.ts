/* eslint-disable @typescript-eslint/comma-dangle */
import currency from 'currency.js';

export default {
  format: (
    value: number,
    { separator = ' ', precision = 2, decimal = '.', symbol = '' } = {},
  ) => {
    if (Number(value) === Math.floor(value)) {
      precision = 0;
    }
    return currency(value, { separator, precision, decimal, symbol }).format();
  },
  add: (value: currency.Any, addValue: currency.Any, { precision = 2 } = {}) =>
    String(currency(value, { precision }).add(addValue)),
  subtract: (
    value: currency.Any,
    subtractValue: currency.Any,
    { precision = 2 } = {},
  ) => String(currency(value, { precision }).subtract(subtractValue)),
  normalize: (value: currency.Any, { precision = 2 } = {}) =>
    String(currency(value, { precision })),
};
