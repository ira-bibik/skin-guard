import { useAppSelector } from '../store/hooks';
import { Role } from '../types/types';

export const useRole = (): Role | undefined => {
	const role = useAppSelector((state) => state.user.user?.role);
	return role;
};
