import { Form, Formik } from 'formik';
import { FC } from 'react';
import { validationSchema } from './validation';
import { FormField } from '../FormField';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './AuthForm.css';
import { Button, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { AuthService } from '../../services/AuthService';
import { setTokenToLocalStorage } from '../../helper/localstorage.helper';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Role, AuthFormValues } from '../../types/types';

interface AuthFormProps {
	initialValues: AuthFormValues;
	type: 'register' | 'login';
}

export const AuthForm: FC<AuthFormProps> = (props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (values: AuthFormValues) => {
		try {
			const data =
				props.type === 'login'
					? await AuthService.login(values)
					: await AuthService.registration(values);
			if (data) {
				setTokenToLocalStorage(data.access_token);
				dispatch(login(data));
				toast.success(
					props.type === 'login'
						? 'You logged in.'
						: 'Account has been created.'
				);
				navigate('/products');
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};
	return (
		<Formik
			initialValues={props.initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				handleSubmit(values);
			}}
		>
			{({ isValid }) => (
				<Form className="formContainer">
					<FormField
						label="Email"
						name="email"
						type="email"
						required={true}
						icon={<AlternateEmailOutlinedIcon />}
					/>
					<FormField
						label="Password"
						name="password"
						type="password"
						required={true}
						icon={<LockOutlinedIcon />}
					/>
					{props.type === 'register' && (
						<FormField
							name="role"
							type="select"
							label="Role"
							required
						>
							<MenuItem value={Role.DOCTOR}>Doctor</MenuItem>
							<MenuItem value={Role.PATIENT}>Patient</MenuItem>
						</FormField>
					)}
					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						className="logInButton"
					>
						{props.type === 'login' ? 'Login' : 'Register'}
					</Button>
				</Form>
			)}
		</Formik>
	);
};
