import { Dialog } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IDoctorData, IPatientData, Role } from '../types/types';
import {
	EditDoctorProfile,
	EditPatientProfile,
} from '../components/EditProfile';
import CloseIcon from '@mui/icons-material/Close';
import '../components/EditProfile/EditProfile.css';

interface IEditProfileOutletContext {
	data: IPatientData | IDoctorData;
	role: Role;
	setUserData: (values: any) => void;
}

const EditProfile: FC = () => {
	const navigate = useNavigate();

	const [open, setOpen] = useState<boolean>(true);
	const context = useOutletContext() as IEditProfileOutletContext;

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	return (
		<Dialog open={open} onClose={handleClose} scroll="paper">
			{context.role === Role.DOCTOR ? (
				<EditDoctorProfile
					data={context.data as IDoctorData}
					setData={context.setUserData}
				/>
			) : (
				<EditPatientProfile
					data={context.data as IPatientData}
					setData={context.setUserData}
				/>
			)}
			<CloseIcon className="closeIcon" onClick={handleClose} />
		</Dialog>
	);
};

export default EditProfile;
