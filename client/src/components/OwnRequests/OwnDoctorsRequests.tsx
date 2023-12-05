import { FC, useState } from 'react';
import './OwnRequest.css';
import { useLoaderData } from 'react-router-dom';
import { IRequestData } from '../../types/types';
import { Grid } from '@mui/material';
import OwnDoctorsRequestsItem from './OwnDoctorsRequestsItem';

export const OwnDoctorsRequests: FC = () => {
	const requestsFromLoader = useLoaderData() as IRequestData[];
	console.log(requestsFromLoader);
	const [requests, setRequests] =
		useState<IRequestData[]>(requestsFromLoader);
	return (
		<div className="requestsGrid">
			{requests?.length ? (
				<Grid container spacing={4}>
					{requests.map((request) => (
						<Grid
							item
							key={request.requestId}
							xs={12}
							sm={6}
							md={6}
						>
							<OwnDoctorsRequestsItem
								request={request}
								setRequests={setRequests}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<h1>No data!</h1>
			)}
		</div>
	);
};
