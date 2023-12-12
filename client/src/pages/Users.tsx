import { FC } from 'react';
import { AuthService } from '../services/AuthService';
import { UserList } from '../components/UsesList';
import { useLoaderData } from 'react-router-dom';
import { IUsersResponseData } from '../types/types';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { DatabaseService } from '../services/DatabaseService';
import '../components/UsesList/UserList.css';

export const usersLoader = async () => {
	const data = await AuthService.getUsers();
	return data;
};

const Users: FC = () => {
	const { users, totalPages } = useLoaderData() as IUsersResponseData;

	const createBackup = async () => {
		try {
			const data = await DatabaseService.createDatabaseBackup();
			toast.success(data.message);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	const restoreDatabase = async () => {
		try {
			const data = await DatabaseService.restoreDatabase();
			toast.success(data.message);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<>
			<div className="databaseActionContainer">
				<Button onClick={createBackup} className="backupButton">
					Create database backup
				</Button>
				<Button onClick={restoreDatabase} className="restoreButton">
					Restore database
				</Button>
			</div>
			<UserList totalPages={totalPages} users={users} />
		</>
	);
};

export default Users;
