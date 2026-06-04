import { ROLE } from "../constants";

export const isAuthorized = (userRoleId: number | null) =>
  userRoleId ? userRoleId !== ROLE.GUEST : false;
