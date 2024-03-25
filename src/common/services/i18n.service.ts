import * as i18n from 'i18n';
import * as path from 'path';

/**
 * configure shared state
 */
i18n.configure({
  locales: ['ru', 'uz', 'oz', 'en'],
  directory: path.join(__dirname, '../locales'),
  queryParameter: 'language',
  defaultLocale: 'oz'
});

export default i18n;
