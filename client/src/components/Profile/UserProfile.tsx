import { FC } from 'react';
import './Profile.css';
import { IDoctorData, IPatientData, Role } from '../../types/types';
import { useRole } from '../../hooks/getRole';
import { useLoaderData } from 'react-router-dom';
import { PhotoBlock } from './PhotoBlock';
import { PatientInfo } from './PatientInfo';
import { DoctorInfo } from './DoctorInfo';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from '@mui/material';

export interface UserProfileProps {
	actionsButtons?: boolean;
  isScheduleVisible?: boolean;
  role: Role
}

export const UserProfile: FC<UserProfileProps> = ({
	actionsButtons = false,
  isScheduleVisible = false,
  role
}) => {
	const data = useLoaderData() as IPatientData | IDoctorData;
	console.log(data);
	return (
		<>
			<div className="profileContainer">
				<PhotoBlock photo={data.photo} />
				<div className="infoBlock">
					{role === Role.PATIENT && <PatientInfo {...data} />}
					{role === Role.DOCTOR && <DoctorInfo {...data} />}
				</div>
				{actionsButtons && (
					<div className="editButton">
						<IconButton aria-label="add to favorites">
							<EditOutlinedIcon />
						</IconButton>
					</div>
				)}
			</div>
			{/* Schedule */}
			{isScheduleVisible && <div>Schedule</div>}
		</>
	);
};
