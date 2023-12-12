import { useAppSelector } from '../store/hooks';

export const useIdByRole = (): number | undefined => {
	const id = useAppSelector((state) => state.user.user?.idByRole);
	return id;
};
