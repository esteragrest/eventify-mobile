export const convertDate = (dateString: string) => {
  const [day, month, year] = dateString.split(".");
  return `${year}-${month}-${day}`;
};

export const convertTime = (timeString: string) => {
  return timeString.slice(0, 5);
};
