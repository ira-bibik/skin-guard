import { FC, useEffect, useState } from 'react';
import { IScheduleData } from '../../types/types';
import './Profile.css';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { EditSchedule } from '../EditSchedule';
import { ScheduleService } from '../../services/ScheduleService';
import { toast } from 'react-toastify';

interface ScheduleProps {
	schedule?: IScheduleData[];
}

export const Schedule: FC<ScheduleProps> = ({ schedule }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const handleClose = () => {
		setOpen(false);
	};

	const [scheduleList, setScheduleList] = useState<
		IScheduleData[] | undefined
	>(schedule);
	const [scheduleForEdit, setScheduleForEdit] = useState<IScheduleData>();

	const getSchedule = async () => {
		const data = await ScheduleService.getScheduleById(
			scheduleForEdit?.scheduleId
		);
		return data;
	};

	const deleteSchedule = async (scheduleId: number) => {
		try {
			const data = await ScheduleService.deleteSchedule(scheduleId);
			setScheduleList((values) =>
				values?.filter((el) => el.scheduleId !== scheduleId)
			);
			toast.success(data.message);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	const updateScheduleList = async () => {
		const data = await getSchedule();
		if (data) {
			setScheduleList((values) =>
				values?.map((el) => {
					if (el.scheduleId === scheduleForEdit?.scheduleId) {
						el.description = data.description;
						el.time = data.time;
					}
					return el;
				})
			);
		}
	};

	useEffect(() => {
		updateScheduleList();
	}, [scheduleForEdit, open]);

	return (
		<>
			<h1>Schedule</h1>
			{scheduleList &&
				scheduleList[0] &&
				scheduleList[0].product &&
				scheduleList?.map((el) => (
					<div key={el.scheduleId} className="scheduleBlock">
						<div>
							<p>Product:</p>
							<h3
								className="productLink"
								onClick={() =>
									navigate(
										`/products/${el.product.productId}`
									)
								}
							>
								{el.product.name}
							</h3>
						</div>
						<div>
							<p>Time:</p>
							<h3>{el.time}</h3>
						</div>
						<div>
							<p>Description:</p>
							<h3>{el.description || 'No description'}</h3>
						</div>
						<div>
							<IconButton
								aria-label="edit"
								onClick={() => {
									setScheduleForEdit(el);
									setOpen(true);
								}}
							>
								<EditOutlinedIcon />
							</IconButton>
							<IconButton
								aria-label="delete"
								onClick={() => deleteSchedule(el.scheduleId)}
							>
								<DeleteOutlinedIcon />
							</IconButton>
						</div>
					</div>
				))}
			<EditSchedule
				open={open}
				handleClose={handleClose}
				schedule={scheduleForEdit}
			/>
		</>
	);
};
