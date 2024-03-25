/* eslint-disable no-plusplus */
import get from 'lodash/get';

export default (value, pattern, defaultValue = '') => {
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

  return pattern.replace(/#/g, _ => get(v, `[${i++}]`, defaultValue));
};
