import { FC } from 'react';
import './DoctorsList.css';
import { IDoctorData, Role } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/isAuth';
import { useRole } from '../../hooks/getRole';
import { IconButton, Tooltip } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

interface DoctorsListItem {
	doctor: IDoctorData;
	setDoctorId: (doctorId: number) => void;
}

// export interface IDoctorData {
// 	doctorId: number;
// 	name?: string;
// 	work?: string;
// 	specialization?: string;
// 	description?: string;
// 	photo?: string;
// 	patients?: IPatientData[];
// }

export const DoctorsListItem: FC<DoctorsListItem> = ({
	doctor,
	setDoctorId,
}) => {
	const navigate = useNavigate();
	const isAuth = useAuth();
	const role = useRole();
	const handleAdd = () => {
		setDoctorId(doctor.doctorId);
		navigate('createRequest');
	};

	return (
		<div className="doctorBlock">
			<img
				src={
					doctor.photo ||
					'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp'
				}
				alt="doctor avatar"
				className="doctorAvatar"
				onClick={() =>
					isAuth ? navigate(`${doctor.doctorId}`) : navigate(`/login`)
				}
			/>
			<div>
				<div>
					<p>Name:</p>
					<h3>{doctor.name || 'No data found'}</h3>
				</div>
				<div>
					<p>Work:</p>
					<h3>{doctor.work || 'No data found'}</h3>
				</div>
				<div>
					<p>Specialization</p>
					<h3>{doctor.specialization || 'No data found'}</h3>
				</div>
			</div>
			{isAuth && role === Role.PATIENT && (
				<Tooltip title="Send request">
					<IconButton
						aria-label="create request"
						className="addButton"
						onClick={handleAdd}
					>
						<AddOutlinedIcon />
					</IconButton>
				</Tooltip>
			)}
		</div>
	);
};
