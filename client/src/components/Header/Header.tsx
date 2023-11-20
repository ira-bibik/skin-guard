import { FC, useState } from 'react';
import './Header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
enum Role {
	ADMIN = 'admin',
	PATIENT = 'patient',
	DOCTOR = 'doctor',
}

const Header: FC = () => {
	//get from redux
	const isAuth = true;
	const [role, setRole] = useState<Role>(Role.DOCTOR);

	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<header className="headerContainer">
			{/* LOGO */}
			<Link to={'/'} className="logo">
				SkinGuard
			</Link>
			{/* NAVBAR */}
			<nav className="navbarContainer">
				<NavLink to={'/products'}>Products</NavLink>

				<NavLink to={'/doctors'}>Doctors</NavLink>

				{role === Role.ADMIN && isAuth && (
					<NavLink to={'/users'}>Users</NavLink>
				)}
			</nav>
			{/* MENU */}
			{isAuth && (
				<div>
					<IconButton onClick={handleClick}>
						<MoreVertIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						sx={{
							'& .MuiMenu-list': {
								padding: 0,
							},
							'& .MuiPaper-root': {
								background: 'transparent',
								boxShadow: 'none',
							},
							'& .MuiMenuItem-root': {
								padding: 0,
								borderRadius: 10,
							},
						}}
					>
						{role !== Role.ADMIN && (
							<MenuItem onClick={handleClose}>
								<Link to={`me`} className="menuItem">
									<p>Your profile</p>
								</Link>
							</MenuItem>
						)}
						{role === 'patient' && (
							<MenuItem onClick={handleClose}>
								<Link to={`me/schedule`} className="menuItem">
									<p>Schedule</p>
								</Link>
							</MenuItem>
						)}
						{role === 'doctor' && (
							<>
								<MenuItem onClick={handleClose}>
									<Link
										to={`me/patients`}
										className="menuItem"
									>
										<p>Patients</p>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link
										to={`me/requests`}
										className="menuItem"
									>
										<p>Requests</p>
									</Link>
								</MenuItem>
							</>
						)}
						<MenuItem onClick={handleClose}>
							<Link to={'/'} className="menuItem">
								<p>Logout</p>
							</Link>
						</MenuItem>
					</Menu>
				</div>
			)}
			{/* Actions */}
			{!isAuth && (
				<ButtonGroup className="guestButtons">
					<Button
						className="login"
						variant="outlined"
						onClick={() => {
							navigate('login');
						}}
					>
						Log In
					</Button>
					<Button
						className="register"
						variant="outlined"
						onClick={() => {
							navigate('register');
						}}
					>
						Sign In
					</Button>
				</ButtonGroup>
			)}
		</header>
	);
};

export { Header };
