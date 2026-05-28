import { ROLE } from '../constants';

export const checkAccessRights = (userId, currentUserId, currentUserRoleId) => {
	if (userId !== currentUserId && currentUserRoleId !== ROLE.ADMIN) {
		return false;
	}

	return true;
};
