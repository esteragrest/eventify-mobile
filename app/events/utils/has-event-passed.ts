import { convertDate } from "../../../utils";

export const hasEventPassed = (eventDate: string) => {
  if (!eventDate) return false;

  const formattedDate = new Date(convertDate(eventDate));
  return formattedDate < new Date();
};
