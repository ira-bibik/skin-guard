import { FC } from 'react';
import { AuthService } from '../services/AuthService';
import { UserList } from '../components/UsesList';

export const usersLoader = async () => {
	const data = await AuthService.getUsers();
	return data;
};

const Users: FC = () => {
	return (
		<>
			<UserList />
		</>
	);
};

export default Users;
