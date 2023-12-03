import { FC } from 'react';
import { IDoctorData } from '../../types/types';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { PatientService } from '../../services/PatientService';
import { toast } from 'react-toastify';

interface PatientInfoProps {
	name?: string;
	age?: number;
	skinType?: string;
	doctor?: IDoctorData;
	actionsButtons?: boolean;
}

export const PatientInfo: FC<PatientInfoProps> = ({
	name,
	age,
	skinType,
	doctor,
	actionsButtons = false,
}) => {
	const navigate = useNavigate();
	const unsubscribe = async () => {
		try {
			const data = await PatientService.unsubscribe();
			toast.success(data.message);
			navigate('/me');
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};
	return (
		<>
			<div className="infoBlockItem">
				<p>Name:</p>
				<h3>{name || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Age:</p>
				<h3>{age || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Skin type:</p>
				<h3>{skinType || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Doctor:</p>
				<div className="doctorDeleteContainer">
					<h3
						onClick={() =>
							doctor?.name &&
							navigate(`/doctors/${doctor?.doctorId}`)
						}
					>
						{doctor?.name || 'No data'}
					</h3>
					{actionsButtons && doctor?.name && (
						<Tooltip title="Unsubscribe">
							<IconButton onClick={unsubscribe}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					)}
				</div>
			</div>
		</>
	);
};
