import * as Helpers from '../../../../common/helpers';
import { i18n } from '../../../../common/services';

import get from 'lodash/get';

const receipt = (item = {}, { currentLanguage, host }) => {
  i18n.setLocale(currentLanguage);

  const statuses = {
    PAID: i18n.__('invoice_status_paid'),
    OPEN: i18n.__('invoice_status_open'),
    EXPIRED: i18n.__('invoice_status_expired'),
    CANCELED: i18n.__('invoice_status_canceled')
  };
  const status = get(item, 'invoice_STATUS');
  const details = get(item, 'invoice_DETAILS') || '';

  return {
    id: get(item, 'invoice_SERIAL') || 0,
    applicationNumber: get(item, 'application_ID'),
    date: get(item, 'invoice_ISSUE_DATE'),
    status: {
      key: status,
      text: get(statuses, status)
    },
    organization: get(item, 'invoice_PAYEE') || '',
    bank: {
      name: get(item, 'invoice_BANK_NAME'),
      account: Helpers.stringMask(get(item, 'invoice_BANK_ACCOUNT') || '', '#### #### #### #### ####'),
      code: get(item, 'invoice_BANK_MFO') || ''
    },
    personalAccount: Helpers.stringMask(get(item, 'invoice_BUDGET_ACCOUNT') || '', '##### ##### ##### ##### #####'),
    details,
    invoiceNumber: Helpers.stringMask(get(item, 'invoice_SERIAL') || '', '#### #### #### ##'),
    amount: i18n.__('format_amount', { value: Helpers.currency.format(get(item, 'invoice_AMOUNT') || 0) }),
    qr: get(item, 'invoice_QR_CODE') || '',
    translations: {
      application_number: i18n.__('application_number'),
      application_notification_date: i18n.__('application_notification_date'),
      recipient_name: i18n.__('recipient_name'),
      recipient_account: i18n.__('recipient_account'),
      recipient_code: i18n.__('recipient_code'),
      personal_account: i18n.__('personal_account'),
      payment_details: i18n.__('payment_details'),
      payment_info_title: i18n.__('payment_info_title'),
      payment_info_1: i18n.__('payment_info_1'),
      payment_info_2: i18n.__('payment_info_2', { details }),
      payment_info_3: i18n.__('payment_info_3'),
      invoice_number: i18n.__('invoice_number'),
      payment_amount: i18n.__('payment_amount')
    },
    host
  };
};

export default receipt;
