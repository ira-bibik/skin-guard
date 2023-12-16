import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { toast } from 'react-toastify';
import {
	getTokenFromLocalStorage,
	parseJwt,
	setTokenToLocalStorage,
} from './helper/localstorage.helper';
import { AuthService } from './services/AuthService';
import { useAppDispatch } from './store/hooks';
import { login, logout } from './store/user/userSlice';
import { getRole } from './helper/getRole.helper';
import { Role } from './types/types';

const App: FC = () => {
	const dispatch = useAppDispatch();

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();
		try {
			if (token) {
				setTokenToLocalStorage(token);
				const { role, userId } = parseJwt(token);
				let adminData;
				let userData;
				if (role === Role.ADMIN) {
					adminData = await AuthService.getUserById(userId);
				} else {
					userData = await AuthService.getProfile(role);
				}
				if (userData || adminData) {
					dispatch(login({ access_token: token }));
				} else {
					dispatch(logout());
				}
			} else {
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);
	return <RouterProvider router={router} />;
};

export default App;
