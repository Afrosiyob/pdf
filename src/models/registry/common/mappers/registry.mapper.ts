import { global as config } from '../../../../common/configs';
import { i18n } from '../../../../common/services';

import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import padStart from 'lodash/padStart';
import startCase from 'lodash/startCase';
import moment from 'moment';

const registry = (item = {}, { currentLanguage, host }) => {
  i18n.setLocale(currentLanguage);

  const id = `${get(item, 'id') || ''}`;
  const tin = get(item, 'tin') || '';
  const date = get(item, 'created_at') || '';
  const region = get(item, `address_region[${currentLanguage}]`) || '';
  const subRegion = get(item, `address_sub_region[${currentLanguage}]`) || '';
  const address = get(item, `address`) || '';

  return {
    id,
    number: (id.length <= 8 ? padStart(`${id}`, 8, '0') : id) || '',
    tin,
    name: get(item, 'name') || '',
    address: [region, subRegion, address].filter(i => !!i).join(', '),
    date: date ? moment(date).format('DD.MM.YYYY') : '',
    link: `${config.api.qr_base_url}/registry?filter[tin]=${tin}`,
    registers: orderBy(
      (get(item, 'registers') || []).map(item => register(item, { currentLanguage })),
      ['id'],
      ['desc']
    ),
    translations: {
      address: i18n.__('address'),
      activity_address: i18n.__('activity_address'),
      registry_number: i18n.__('registry_number'),
      licensing_organization: i18n.__('licensing_organization'),
      license_validity_period: i18n.__('license_validity_period'),
      service_name: i18n.__('service_name'),
      document_number_and_status: i18n.__('document_number_and_status'),
      organization_name: i18n.__('organization_name'),
      the_tin_number_of_the_licensee: i18n.__('the_tin_number_of_the_licensee'),
      date_of_submission_of_the_extract: i18n.__('date_of_submission_of_the_extract'),
      extract: i18n.__('extract')
    },
    host
  };
};

const register = (item = {}, { currentLanguage }) => {
  const from_date = get(item, 'registration_date') || '';
  const to_date = get(item, 'expires') || '';

  return {
    id: get(item, 'id') || 0,
    name: get(item, `document[${currentLanguage}]`),
    number: get(item, 'number') || '',
    register_number: get(item, 'register_number') || '',
    organization: get(item, `organization[name${startCase(currentLanguage)}]`) || '',
    date: {
      from: from_date ? i18n.__('from_date', { date: moment(from_date).format('DD.MM.YYYY') }) : '',
      to: from_date
        ? to_date
          ? i18n.__('to_date', { date: moment(to_date).format('DD.MM.YYYY') })
          : i18n.__('to_infinity')
        : ''
    },
    status: get(item, `status_title[${currentLanguage}]`),
    type: get(item, `document_type_title[${currentLanguage}]`) || '',
    addresses: (get(item, 'activity_addresses_') || []).map((item, index, array) => {
      const address = get(item, `[${currentLanguage}]`) || '';

      return `${array.length > 1 ? `${index + 1}. ` : ''}${address}`;
    })
  };
};

export default registry;
