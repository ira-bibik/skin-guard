import { FC } from 'react';
import './OwnPatients.css';
import { useLoaderData } from 'react-router-dom';
import { IOwnPatientsResponseData } from '../../types/types';
import { Grid } from '@mui/material';
import { PatientItem } from './PatientItem';

export const OwnPatientsList: FC = () => {
	const { patients } = useLoaderData() as IOwnPatientsResponseData;
	return (
		<div className="patientsGrid">
			{patients.length ? (
				<Grid container spacing={4}>
					{patients.map((patient) => (
						<Grid
							item
							key={patient.patientId}
							xs={12}
							sm={6}
							md={6}
						>
							<PatientItem patient={patient}/>
						</Grid>
					))}
				</Grid>
			) : <h1>No data!</h1>}
		</div>
	);
};
