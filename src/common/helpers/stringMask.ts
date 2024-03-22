/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-plusplus */
import get from 'lodash/get';

export default (
  value: string | any[],
  pattern: {
    length: any;
    match: (arg0: RegExp) => { (): any; new (): any; length: any };
    replace: (arg0: RegExp, arg1: (_: any) => any) => any;
  },
  defaultValue = '',
) => {
  if (!pattern || !pattern.length) {
    return value;
  }

  if (!value) {
    return '';
  }

  if (value.length !== pattern.match(/#/g).length) {
    return value;
  }

  let i = 0;
  const v = value.toString();

  return pattern.replace(/#/g, (_: any) => get(v, `[${i++}]`, defaultValue));
};
