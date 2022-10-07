import dayjs, { locale, extend } from 'dayjs';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

locale('pt-br');
extend(relativeTime);

export const formatDateSocialMedia = (date: string, locale = 'pt-br') => {
  const isPostedToday = dayjs(date).isSame(dayjs(), 'day');

  if (isPostedToday) {
    return dayjs(date).locale(locale).fromNow();
  }

  if (locale === 'pt-br') {
    return dayjs(date).locale(locale).format('DD/MM/YYYY HH:mm');
  }

  return dayjs(date).locale(locale).format('MM/DD/YYYY HH:mm');
};
