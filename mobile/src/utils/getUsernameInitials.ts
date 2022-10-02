export const getUsernameInitials = (username: string) => {
  const userInitials = String(username)
    .split(' ')
    .map((name) => name[0])
    .join('');

  return userInitials.toUpperCase();
};
