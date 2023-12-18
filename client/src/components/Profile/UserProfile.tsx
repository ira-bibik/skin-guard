import { FC } from 'react';
import './Profile.css';
import { IDoctorData, IPatientData, Role } from '../../types/types';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { PhotoBlock } from './PhotoBlock';
import { PatientInfo } from './PatientInfo';
import { DoctorInfo } from './DoctorInfo';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from '@mui/material';
import { Schedule } from './Schedule';

export interface UserProfileProps {
	actionsButtons?: boolean;
	isScheduleVisible?: boolean;
	role: Role;
	data: IPatientData | IDoctorData;
}

export const UserProfile: FC<UserProfileProps> = ({
	actionsButtons = false,
	isScheduleVisible = false,
	role,
	data,
}) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="profileContainer">
				<PhotoBlock
					photo={data.photo}
					actionsButtons={actionsButtons}
				/>
				<div className="infoBlock">
					{role === Role.PATIENT && (
						<PatientInfo
							{...(data as IPatientData)}
							actionsButtons={actionsButtons}
						/>
					)}
					{role === Role.DOCTOR && (
						<DoctorInfo {...(data as IDoctorData)} />
					)}
				</div>
				{actionsButtons && (
					<div className="editButton">
						<IconButton
							aria-label="add to favorites"
							onClick={() => navigate('edit')}
						>
							<EditOutlinedIcon />
						</IconButton>
					</div>
				)}
			</div>
			{/* Schedule */}
			{isScheduleVisible && <Schedule {...(data as IPatientData)} />}
		</>
	);
};
