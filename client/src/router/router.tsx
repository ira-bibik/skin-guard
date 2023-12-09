import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Users, { usersLoader } from '../pages/Users';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile, { profileLoader } from '../pages/Profile';
import Patients, { ownPatientsLoader } from '../pages/Patients';
import Requests, { OwnDoctorsRequestsLoader } from '../pages/Requests';
import Doctors, { doctorsLoader } from '../pages/Doctors';
import Products, { productsLoader } from '../pages/Products';
import UserPage from '../pages/UserPage';
import Product from '../pages/Product';
import Doctor, { doctorLoader } from '../pages/Doctor';
import Patient, { patientLoader } from '../pages/Patient';
import EditProfile from '../pages/EditProfile';
import CreateRequest from '../pages/CreateRequest';
import { CreateSchedule } from '../pages/CreateSchedule';
import { CreateProduct } from '../pages/CreateProduct';
import { EditProduct, productLoader } from '../pages/EditProduct';

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
				path: 'me/patients',
				element: <Patients />,
				loader: ownPatientsLoader,
			},
			{
				path: 'me/patients/:patientId',
				element: <Patient />,
				loader: patientLoader,
			},
			{
				path: 'me/requests',
				element: <Requests />,
				loader: OwnDoctorsRequestsLoader,
			},
			{
				path: 'users/*',
				element: <Users />,
				loader: usersLoader,
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
				children: [
					{
						path: 'createSchedule',
						element: <CreateSchedule />,
					},
				],
			},
			{
				path: 'products/:productId',
				element: <Product />,
				loader: productLoader,
			},
			{
				path: 'products/:productId/edit',
				element: <EditProduct />,
				loader: productLoader,
			},
			{
				path: 'products/create',
				element: <CreateProduct />,
			},
		],
	},
]);
