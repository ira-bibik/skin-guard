import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IResponseUserData, IUser } from '../../types/types';
import { parseJwt } from '../../helper/localstorage.helper';

interface UserState {
	user: IUser | null;
	isAuth: boolean;
}

const initialState: UserState = {
	user: null,
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IResponseUserData>) => {
			const token = action.payload.access_token;
			const { userId, email, role, idByRole } = parseJwt(token);
			state.user = { userId, email, role, idByRole };
			state.isAuth = true;
		},
		logout: (state) => {
			state.isAuth = false;
			state.user = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
