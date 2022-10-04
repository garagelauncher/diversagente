import dayjs, { locale, extend } from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

locale('pt-br');
extend(relativeTime);

export const formatDateSocialMedia = (date: string) => {
  const isPostedInLast24Hours = dayjs().diff(date, 'day') < 1;
  const isPostedInLastHour = dayjs().diff(date, 'hour') < 1;

  if (isPostedInLastHour) {
    return dayjs(date).fromNow();
  }

  if (isPostedInLast24Hours) {
    return dayjs(date).format('HH:mm');
  }

  return dayjs(date).format('DD/MM/YYYY');
};
