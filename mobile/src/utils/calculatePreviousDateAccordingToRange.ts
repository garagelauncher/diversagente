export const calculatePreviousDateAccordingToRange = (dateRange: number) => {
  const now = new Date();

  return new Date(now.getTime() - dateRange * 24 * 60 * 60 * 1000);
};
