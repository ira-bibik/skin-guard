import { FC, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { IUserData, IUsersResponseData } from '../../types/types';
import { AuthService } from '../../services/AuthService';
import './UserList.css';
import {
	IconButton,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { formatDate } from '../../helper/date.helper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { toast } from 'react-toastify';

interface UserListProps {
	users: IUserData[];
	totalPages: number;
}

export const UserList: FC<UserListProps> = ({ users, totalPages }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [usersListData, setUsersListData] = useState<IUserData[]>(users);
	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(searchParams.get('page') || '1')
	);
	const [totalPagesOfUsers, setTotalPages] = useState<number>(totalPages);
	const navigate = useNavigate();

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
		const data = await AuthService.getUsers(page);
		setUsersListData(data.users);
		setTotalPages(data.totalPages);
	};

	const deleteUser = async (userId: number) => {
		try {
			const data = await AuthService.deleteUserById(userId);
			setUsersListData((values) =>
				values?.filter((el) => el.userId !== userId)
			);
			toast.success(data.message);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<div className="usersGrid">
			{usersListData.length ? (
				<Table sx={{ maxWidth: 1050 }}>
					<TableHead>
						<TableRow>
							<TableCell className="tableHead" align="left">
								Email
							</TableCell>
							<TableCell className="tableHead" align="left">
								Role
							</TableCell>
							<TableCell className="tableHead" align="left">
								Created date
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{usersListData.map((user) => (
							<TableRow key={user.userId}>
								<TableCell align="left">{user.email}</TableCell>
								<TableCell align="left">{user.role}</TableCell>
								<TableCell align="left">
									{formatDate(user.createAt)}
								</TableCell>
								<TableCell align="left">
									<IconButton
										aria-label="delete user"
										onClick={() => deleteUser(user.userId)}
									>
										<DeleteOutlinedIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<h1>Users are not found</h1>
			)}
			<Pagination
				color="primary"
				count={totalPagesOfUsers}
				page={currentPage}
				onChange={handleChangePage}
				variant="outlined"
				shape="rounded"
			/>
		</div>
	);
};
