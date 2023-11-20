import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Schedule from '../pages/Schedule';
import Patients from '../pages/Patients';
import Requests from '../pages/Requests';
import Doctors from '../pages/Doctors';
import Products from '../pages/Products';
import UserPage from '../pages/UserPage';
import Product from '../pages/Product';
import Doctor from '../pages/Doctor';
import Patient from '../pages/Patient';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'me',
				element: <Profile />,
			},
			{
				path: 'me/schedule',
				element: <Schedule />,
			},
			{
				path: 'me/patients',
				element: <Patients />,
			},
			{
				path: 'me/patients/:patientId',
				element: <Patient />,
			},
			{
				path: 'me/patients/:patientId/schedule',
				element: <Schedule />,
			},
			{
				path: 'me/requests',
				element: <Requests />,
			},
			{
				path: 'users/*',
				element: <Users />,
			},
			{
				path: 'users/:userId',
				element: <UserPage />,
			},
			{
				path: 'doctors',
				element: <Doctors />,
			},
			{
				path: 'doctors/:doctorId',
				element: <Doctor />,
			},
			{
				path: 'products/*',
				element: <Products />,
			},
			{
				path: 'products/:productId',
				element: <Product />,
			},
		],
	},
]);
