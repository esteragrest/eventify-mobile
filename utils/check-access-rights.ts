import { ROLE } from "../constants";

export const checkAccessRights = (
  userId: number,
  currentUserId: number,
  currentUserRoleId: number,
) => {
  if (userId !== currentUserId && currentUserRoleId !== ROLE.ADMIN) {
    return false;
  }

  return true;
};
