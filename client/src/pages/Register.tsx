import { FC } from 'react';
import '../components/AuthForms/AuthForm.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForms';
import { Role } from '../types/types';
const Register: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="authPageContainer">
			<Typography className="formTitle">Join our team!!</Typography>
			<AuthForm
				type={'register'}
				initialValues={{ email: '', password: '', role: Role.PATIENT }}
			/>
			<Typography>
				Already have an account?{' '}
				<span className="formLink" onClick={() => navigate('/login')}>
					Login
				</span>
			</Typography>
		</div>
	);
};

export default Register;
