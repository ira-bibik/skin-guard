import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { toast } from 'react-toastify';
import { getTokenFromLocalStorage } from './helper/localstorage.helper';
import { AuthService } from './services/AuthService';
import { useAppDispatch } from './store/hooks';
import { login, logout } from './store/user/userSlice';
import { getRole } from './helper/getRole.helper';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();
		try {
			if (token) {
				const role = getRole();
				const data = await AuthService.getProfile(role);
				if (data) {
					dispatch(login({ access_token: token }));
				} else {
					dispatch(logout());
				}
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);
	return <RouterProvider router={router} />;
};

export default App;