import { global as config } from '../../../../common/configs';
import { i18n } from '../../../../common/services';

import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

export enum TYPE {
  NOTIFICATION = 'NOTIFICATION',
  PERMIT = 'PERMIT',
  FILE_JOIN = 'FILE_JOIN',
  TEXT_GROUP = 'TEXT_GROUP'
}

const certificate = (item = {}, { currentLanguage, host }) => {
  i18n.setLocale(currentLanguage);

  const region = get(item, `region[${currentLanguage}]`) || '';
  const subRegion = get(item, `subRegion[${currentLanguage}]`) || '';
  const village = get(item, `village[${currentLanguage}]`) || '';
  const address = get(item, `address`) || '';

  const postal_address = `${region && `${region}, `}${subRegion && `${subRegion}, `}${village && `${village}, `}${address}`;
  const activity_addresses = (get(item, 'activity_addresses') || [])
    .map(item => get(item, `value[${currentLanguage}]`))
    .join(', <br/>');
  const register_date = get(item, 'registration_date') || '';
  const expire_date = get(item, 'expiry_date') || '';
  const type = (get(item, 'type') as TYPE) || TYPE.NOTIFICATION;

  let register_title = i18n.__('serial_number_according_to_the_register_of_the_license');

  if (type === TYPE.NOTIFICATION) {
    register_title = i18n.__('serial_number_of_the_confirmation_register');
  }

  if (type === TYPE.PERMIT) {
    register_title = i18n.__('permission_register_sequence_number');
  }

  const params = [
    {
      title: register_title,
      value: get(item, 'register_number') || '',
      position: 1
    },
    {
      title: i18n.__('taxpayer_identification_number_tin'),
      value: get(item, 'tin') || '',
      position: 2
    },
    {
      title: i18n.__('license_validity_period'),
      value: `${register_date && i18n.__('from_date', { date: register_date })} ${expire_date && i18n.__('to_date', { date: expire_date })}`,
      position: 3,
      isHidden: get(item, 'type') === 'NOTIFICATION'
    },
    {
      title: i18n.__('actual_postal_address'),
      value: postal_address || '-------------------------------------',
      position: 4
    },
    {
      title: i18n.__('activity_address'),
      value: activity_addresses || '-------------------------------------',
      position: 5,
      isHidden: !activity_addresses
    },
    // {
    //   title: i18n.__('license_validity_period_up_to'),
    //   value: get(item, 'expiry_date') || '',
    //   position: 6,
    //   isHidden: get(item, 'type') === 'NOTIFICATION'
    // },
    {
      title: i18n.__('authorized_body'),
      value: get(item, `organization[${currentLanguage}]`),
      position: 7
    },
    {
      title: i18n.__('imprint_of_the_personal_stamp_of_the_manufacturer'),
      value: get(item, `brand_mark`),
      position: 8,
      isHidden: !!!get(item, `brand_mark`)
    }
  ];

  const title_text_value =
    get(item, 'type') === 'NOTIFICATION'
      ? i18n.__(`about_acceptance`, { value: i18n.__(`title_${get(item, 'type')}`) })
      : '';
  let title_text = {
    top: title_text_value,
    bottom: ''
  };

  if (['ru', 'en'].includes(currentLanguage)) {
    title_text = {
      top: '',
      bottom: title_text_value
    };
  }

  let license_issue_date = i18n.__('license_issue_date');

  if (type === 'NOTIFICATION' || type === 'PERMIT') {
    license_issue_date = i18n.__('submission_date');
  }

  const specializations = (get(item, `specializations`) || []).map(s => ({
    id: get(s, 'id') || 0,
    position: get(s, 'position') || 0,
    name: get(s, `[name][${currentLanguage}]`),
    description: get(s, `[description][${currentLanguage}]`)
  }));

  const specializationsByPosition = groupBy(specializations, 'position');

  const specializationsByAddress = (get(item, 'activity_addresses') || []).map(item => ({
    name: get(item, `value[${currentLanguage}]`),
    specializations: specializationsByPosition[get(item, 'position') || 0]
  }));

  return {
    id: get(item, 'id') || 0,
    title: i18n.__(`title_${get(item, 'type')}`),
    title_text,
    number: i18n.__('series', {
      number: get(item, 'number') || '',
      series: i18n.__(`title_${get(item, 'type')}`)
    }),
    name: get(item, 'name') || '',
    organization: get(item, `organization[${currentLanguage}]`) || '',
    director: get(item, `organization_director[${currentLanguage}]`) || '',
    document: get(item, `document[${currentLanguage}]`),
    type: get(item, `type_title[${currentLanguage}]`),
    registration: {
      number: get(item, 'register_number') || '',
      date: get(item, 'registration_date') || ''
    },
    link: `${config.api.qr_base_url}/registry/${get(item, 'qr_link') || ''}`,
    params: params.filter(p => !p.isHidden),
    specializations,
    isMultiSpecialization: !!get(item, 'is_multi_specialization'),
    specializationsByAddress,
    training_categories: get(item, 'training_categories')
      ? (get(item, 'training_categories') || []).map(category => ({
          name: get(category, `name[${currentLanguage}]`) || '',
          courses: (get(category, 'courses') || [])
            .map((course: any) => get(course, `name[${currentLanguage}]`) || '')
            .join(', ')
        }))
      : null,
    additions: orderBy(
      (get(item, 'additions') || []).map(item => {
        const type = get(item, 'type') || '';
        let value = get(item, 'value') || '';

        if (type === 'FILE_JOIN') {
          value = value.replace('http://api.licenses.uz/v1', config.api.file_base_url);
        }
        if (type === 'TEXT_GROUP') {
          value = groupBy(
            (get(item, 'duplicable_values') || []).map(item => {
              let value = get(item, 'value') || '';

              if (!value) {
                value = get(item, `option[${currentLanguage}]`) || '';
              }

              return {
                row: get(item, 'position'),
                position: get(item, 'row'),
                value,
                isHead: Number(get(item, 'position')) === 0
              };
            }),
            'row'
          );
        }

        return {
          key: get(item, 'key') || '',
          type: get(item, 'type') || '',
          title: get(item, `title[${currentLanguage}]`) || '',
          value
        };
      }),
      ['position'],
      'asc'
    ),
    host,
    head_of_the_licensing_authority: i18n.__('head_of_the_licensing_authority'),
    license_issue_date,
    to_first_page: get(item, 'to_first_page'),
    translations: {
      activity_type: i18n.__('activity_type'),
      educational_directions: i18n.__('educational_directions'),
      additional_information: i18n.__('additional_information')
    }
  };
};

export default certificate;
