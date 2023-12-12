import { FC } from 'react';
import './Profile.css';

interface DoctorInfoProps {
	name?: string;
	work?: string;
	specialization?: string;
	description?: string;
}

export const DoctorInfo: FC<DoctorInfoProps> = ({
	name,
	work,
	specialization,
	description,
}) => {
	return (
		<>
			<div className="infoBlockItem">
				<p>Name:</p>
				<h3>{name || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Work:</p>
				<h3>{work || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Specialization:</p>
				<h3>{specialization || 'No data'}</h3>
			</div>
			<div className="infoBlockItem">
				<p>Description:</p>
				<h3>{description || 'No data'}</h3>
			</div>
		</>
	);
};
