import dayjs, { locale, extend } from 'dayjs';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

locale('pt-br');
extend(relativeTime);

export const formatDateSocialMedia = (date: string, locale = 'pt-br') => {
  const isPostedInLast24Hours = dayjs().locale(locale).diff(date, 'day') < 1;
  const isPostedInLastHour = dayjs().locale(locale).diff(date, 'hour') < 1;

  if (isPostedInLastHour) {
    return dayjs(date).locale(locale).fromNow();
  }

  if (isPostedInLast24Hours) {
    return dayjs(date).locale(locale).format('HH:mm');
  }

  if (locale === 'pt-br') {
    return dayjs(date).locale(locale).format('DD/MM/YYYY');
  }

  return dayjs(date).locale(locale).format('MM/DD/YYYY');
};
