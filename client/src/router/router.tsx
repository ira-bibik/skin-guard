import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Users from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile, { profileLoader } from '../pages/Profile';
import Schedule from '../pages/Schedule';
import Patients from '../pages/Patients';
import Requests from '../pages/Requests';
import Doctors, { doctorsLoader } from '../pages/Doctors';
import Products, { productsLoader } from '../pages/Products';
import UserPage from '../pages/UserPage';
import Product from '../pages/Product';
import Doctor, { doctorLoader } from '../pages/Doctor';
import Patient, { patientLoader } from '../pages/Patient';
import EditProfile from '../pages/EditProfile';
import CreateRequest from '../pages/CreateRequest';

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
				loader: profileLoader,
				children: [
					{
						path: 'edit',
						element: <EditProfile />,
					},
				],
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
				loader: patientLoader,
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
				loader: doctorsLoader,
				children: [
					{
						path: 'createRequest',
						element: <CreateRequest />,
					},
				],
			},
			{
				path: 'doctors/:doctorId',
				element: <Doctor />,
				loader: doctorLoader,
			},
			{
				path: 'products/*',
				element: <Products />,
				loader: productsLoader,
			},
			{
				path: 'products/:productId',
				element: <Product />,
			},
		],
	},
]);
