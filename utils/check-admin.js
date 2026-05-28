import { ROLE } from '../constants';

export const checkAdmin = (userRoleId) => ROLE.ADMIN === userRoleId;
