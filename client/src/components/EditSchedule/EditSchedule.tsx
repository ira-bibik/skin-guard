import { FC } from 'react';
import { IEditScheduleData, IScheduleData } from '../../types/types';
import { Button, Dialog, MenuItem, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormField } from '../FormField';
import CloseIcon from '@mui/icons-material/Close';
import { validationSchema } from '../CreateScheduleForm/validation';
import { toast } from 'react-toastify';
import { ScheduleService } from '../../services/ScheduleService';

interface EditScheduleProps {
	open: boolean;
	handleClose: () => void;
	schedule?: IScheduleData;
}

export const EditSchedule: FC<EditScheduleProps> = ({
	open,
	handleClose,
	schedule,
}) => {
	const initialValues: IEditScheduleData = {
		time: schedule?.time,
		description: schedule?.description,
	};

	const editSchedule = async (values: IEditScheduleData) => {
		try {
			const data = await ScheduleService.editSchedule(
				schedule?.scheduleId,
				values
			);
			toast.success(data.message);
			handleClose();
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} scroll="paper">
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => editSchedule(values)}
				validationSchema={validationSchema}
			>
				{({ isValid }) => (
					<Form className="createRequestForm">
						<Typography variant="h5">Edit schedule</Typography>
						<FormField
							name="time"
							type="select"
							label="Time"
							required={true}
						>
							<MenuItem value={'morning'}>morning</MenuItem>
							<MenuItem value={'evening'}>evening</MenuItem>
						</FormField>
						<FormField
							label="Description"
							name="description"
							type="text"
						/>
						<Button
							type="submit"
							variant="contained"
							disabled={!isValid}
							className="sendButton"
						>
							Send
						</Button>
					</Form>
				)}
			</Formik>

			<CloseIcon className="closeIcon" onClick={handleClose} />
		</Dialog>
	);
};
