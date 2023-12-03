import { FC } from 'react';
import { IScheduleData } from '../../types/types';
import './Profile.css';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';

interface ScheduleProps {
	schedule?: IScheduleData[];
}

// export interface IScheduleData {
// 	scheduleId: number;
// 	time: 'morning' | 'evening';
// 	description?: string;
// 	product: IProductData;
// }

export const Schedule: FC<ScheduleProps> = ({ schedule }) => {
	const navigate = useNavigate()
	return (
		<>
			<h1>Schedule</h1>
			{schedule &&
				schedule[0] &&
				schedule[0].product &&
				schedule?.map((el) => (
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
							<IconButton aria-label="edit">
								<EditOutlinedIcon />
							</IconButton>
							<IconButton aria-label="delete">
								<DeleteOutlinedIcon />
							</IconButton>
						</div>
					</div>
				))}
		</>
	);
};
