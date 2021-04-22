import {
  DateConfig
} from 'const';

const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).split(' ').join(' ');
};

const getFormattedDateTime = (date) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-CA', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).split('-').join('/');

  const formattedTime = new Date(date).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  }).split(' ').join(':');

  return `${formattedDate} ${formattedTime}`;
};

const getTimeFromMinutes = (amount) => {
  const hours = Math.trunc(amount / DateConfig.MAX_MINUTES);
  const minutes = amount % DateConfig.MAX_MINUTES;

  return `${hours}h ${minutes}m`;
};

const truncateText = (text, amount) => {
  return text.length > amount ? `${text.substring(0, amount)}...` : text;
};

export {
  getFormattedDate,
  getFormattedDateTime,
  getTimeFromMinutes,
  truncateText
};
