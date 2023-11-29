import { FC } from 'react';
import { IScheduleData } from '../../types/types';
import './Profile.css';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

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
	return (
		<>
			<h1>Schedule</h1>
			{schedule?.map((el) => (
				<div key={el.scheduleId} className="scheduleBlock">
					<div>
						<p>Product:</p>
						<h3 onClick={() => console.log('hello')}>
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
						<IconButton aria-label="add to favorites">
							<EditOutlinedIcon />
						</IconButton>
						<IconButton aria-label="add to favorites">
							<DeleteOutlinedIcon />
						</IconButton>
					</div>
				</div>
			))}
		</>
	);
};
