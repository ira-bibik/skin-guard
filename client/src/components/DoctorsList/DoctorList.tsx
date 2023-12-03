import { FC, useEffect, useState } from 'react';
import './DoctorsList.css';
import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom';
import {
	IDoctorData,
	IDoctorsResponseData,
	IProductData,
} from '../../types/types';
import { Grid, Pagination } from '@mui/material';
import { DoctorService } from '../../services/DoctorService';
import { DoctorsListItem } from './DoctorsListItem';

export const DoctorList: FC = () => {
	const { doctors, totalPages } = useLoaderData() as IDoctorsResponseData;
	const [doctorsData, setDoctorsData] = useState<IDoctorData[]>(doctors);
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalPages2, setTotalPages] = useState<number>(totalPages);
	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(searchParams.get('page') || '1')
	);

	const handleChangePage = (e: any, page: number) => {
		changePage(page);
	};

	const changePage = (page: number) => {
		setSearchParams({ page: `${page}` });
		setCurrentPage(page);
	};

	useEffect(() => {
		fetchProducts(currentPage);
	}, [currentPage]);

	const fetchProducts = async (page: number) => {
		const data = await DoctorService.getAllDoctors(page);
		setDoctorsData(data.doctors);
		setTotalPages(data.totalPages);
	};

	const [doctorId, setDoctorId] = useState<number>();

	return (
		<>
			<div className="doctorsGrid">
				{doctorsData.length ? (
					<Grid container spacing={4}>
						{doctorsData.map((doctor) => (
							<Grid
								item
								key={doctor.doctorId}
								xs={12}
								sm={6}
								md={6}
							>
								<DoctorsListItem
									doctor={doctor}
									setDoctorId={setDoctorId}
								/>
							</Grid>
						))}
					</Grid>
				) : (
					<h1>Doctors are not found</h1>
				)}
				<Pagination
					color="primary"
					count={totalPages2}
					page={currentPage}
					onChange={handleChangePage}
					variant="outlined"
					shape="rounded"
				/>
			</div>
			<Outlet context={{ doctorId }} />
		</>
	);
};
