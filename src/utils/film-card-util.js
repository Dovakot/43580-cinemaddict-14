import {
  DateConfig
} from 'const';

const FormattedDateConfig = {
  DATE_EN_GB: {
    method: 'toLocaleDateString',
    locale: 'en-GB',
    options: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
    splitValue: ' ',
    joinValue: ' ',
  },
  DATE_FR_CA: {
    method: 'toLocaleDateString',
    locale: 'fr-CA',
    options: {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    },
    splitValue: '-',
    joinValue: '/',
  },
  TIME_EN_GB: {
    method: 'toLocaleTimeString',
    locale: 'en-GB',
    options: {
      hour: 'numeric',
      minute: 'numeric',
    },
    splitValue: ' ',
    joinValue: ':',
  },
};

const getFormattedDate = (date, key = 'DATE_EN_GB') => {
  const {
    method,
    locale,
    options,
    splitValue,
    joinValue,
  } = FormattedDateConfig[key];

  return new Date(date)[method](locale, options).split(splitValue).join(joinValue);
};

const getFormattedDateTime = (date) => (
  `${getFormattedDate(date, 'DATE_FR_CA')}
   ${getFormattedDate(date, 'TIME_EN_GB')}`
);

const getTimeFromMinutes = (amount) => {
  const hours = Math.trunc(amount / DateConfig.MAX_MINUTES);
  const minutes = amount % DateConfig.MAX_MINUTES;

  return `${hours}h ${minutes}m`;
};

const truncateText = (text, amount) => text.length > amount
  ? `${text.substring(0, amount - 1)}...` : text;

export {
  getFormattedDate,
  getFormattedDateTime,
  getTimeFromMinutes,
  truncateText
};
