import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

const isDateInRange = (currentDate, dateFrom, period) => dayjs(dateFrom)
  .isSameOrBefore(currentDate, period);

const getDateFrom = (count, name) => dayjs().subtract(count, name).toDate();

const getFormattedDate = (data, format) => dayjs(data).format(format);

const getYear = (data) => dayjs(data).year();

const getTime = (data, format) => dayjs.duration(data, 'minutes').format(format);

const getRelativeTime = (data) => dayjs(data).fromNow();

export {
  isDateInRange,
  getDateFrom,
  getYear,
  getFormattedDate,
  getTime,
  getRelativeTime
};
