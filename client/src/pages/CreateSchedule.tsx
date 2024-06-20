import { Dialog } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { IProductData } from '../types/types';
import { CreateScheduleForm } from '../components/CreateScheduleForm';

interface ICreateScheduleOutletContext {
	productOutlet: IProductData;
}

export const CreateSchedule: FC = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(true);
	const context = useOutletContext() as ICreateScheduleOutletContext;

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	useEffect(() => {
		if (!context.productOutlet) {
			navigate('/products');
		}
	}, []);
	return (
		<Dialog open={open} onClose={handleClose} scroll="paper">
			<CreateScheduleForm product={context.productOutlet} />
			<CloseIcon className="closeIcon" onClick={handleClose} />
		</Dialog>
	);
};
