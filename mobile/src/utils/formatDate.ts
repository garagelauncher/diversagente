export const formatDate = (date: string | undefined) => {
  if (date) {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(new Date(date));
  }
  return date;
};
