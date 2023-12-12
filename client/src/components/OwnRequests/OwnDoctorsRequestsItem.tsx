import { FC } from 'react';
import { IRequestData } from '../../types/types';
import { IconButton, Tooltip } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { RequestService } from '../../services/RequestServie';
import { toast } from 'react-toastify';

// export interface IRequestData {
// 	coverletter: string;
// 	requestId: number;
// 	patient: IPatientData;
// }

interface OwnDoctorsRequestsItemProps {
	request: IRequestData;
	setRequests: any;
}

const OwnDoctorsRequestsItem: FC<OwnDoctorsRequestsItemProps> = ({
	request,
	setRequests,
}) => {
	const handleSubmit = async () => {
		try {
			const data = await RequestService.submit(request.requestId);
			toast.success(data.message);
			setRequests((state: IRequestData[]) =>
				state.filter(
					(requestFilter: IRequestData) =>
						requestFilter.requestId !== request.requestId
				)
			);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	const handleRemove = async () => {
		try {
			const data = await RequestService.remove(request.requestId);
			toast.success(data.message);
			setRequests((state: IRequestData[]) =>
				state.filter(
					(requestFilter: IRequestData) =>
						requestFilter.requestId !== request.requestId
				)
			);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};
	return (
		<div className="requestBlock">
			<img
				src={
					request.patient.photo ||
					'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp'
				}
				alt="patient avatar"
				className="patientAvatar"
			/>
			<div>
				<div>
					<p>Name:</p>
					<h3>{request.patient.name || 'No data found'}</h3>
				</div>
				<div>
					<p>Skin type</p>
					<h3>{request.patient.skinType || 'No data found'}</h3>
				</div>
				<div>
					<p>Cover letter</p>
					<h3>{request.coverletter || 'No data found'}</h3>
				</div>
			</div>
			<div className="actionsButtons">
				<Tooltip title="Submit request">
					<IconButton
						aria-label="submit request"
						onClick={handleSubmit}
					>
						<CheckOutlinedIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Remove request">
					<IconButton
						aria-label="remove request"
						onClick={handleRemove}
					>
						<ClearOutlinedIcon />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
};

export default OwnDoctorsRequestsItem;
