import stringMask from './stringMask.helper';

export default ({ value, show = { start: 3, end: 2 }, placeholder = '*', pattern = '#### #### #### ####' }) => {
  if (!value) {
    return '';
  }

  const valueLength = value.length;
  const start = value.substring(0, show.start);
  const end = value.substring(valueLength - show.end, valueLength);

  const placeholders = placeholder.repeat(valueLength - show.start - show.end);

  return stringMask(`${start}${placeholders}${end}`, pattern as any);
};
