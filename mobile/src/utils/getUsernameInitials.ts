export const getUsernameInitials = (username: string) => {
  const userInitials = username
    .split(' ')
    .map((name) => name[0])
    .join('');

  return userInitials;
};
