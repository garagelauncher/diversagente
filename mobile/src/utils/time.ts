import dayjs, { locale, extend } from 'dayjs';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

locale('pt-br');
extend(relativeTime);

export const formatDateSocialMedia = (
  date: string,
  locale = 'pt-br',
): string => {
  const isPostedToday = dayjs(date).isSame(dayjs(), 'day');

  if (isPostedToday) {
    return dayjs(date).locale(locale).fromNow();
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));
};
