import { FC } from 'react';
import '../components/AuthForms/AuthForm.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForms';

const Login: FC = () => {
	const navigate = useNavigate();
	return (
		<div className="authPageContainer">
			<Typography className="formTitle">WELCOME BACK!</Typography>
			<AuthForm
				type={'login'}
				initialValues={{ email: '', password: '' }}
			/>
			<Typography>
				Still don't have an account?{' '}
				<span
					className="formLink"
					onClick={() => navigate('/register')}
				>
					Register
				</span>
			</Typography>
		</div>
	);
};

export default Login;
