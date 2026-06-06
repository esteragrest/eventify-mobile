export const checkOwner = (
  organizerId: string | number,
  currentUserId: string | number,
): boolean => organizerId === currentUserId;
