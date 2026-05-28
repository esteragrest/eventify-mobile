import { ROLE } from '../constants';

export const isAuthorized = (userRoleId) => userRoleId !== ROLE.GUEST;
