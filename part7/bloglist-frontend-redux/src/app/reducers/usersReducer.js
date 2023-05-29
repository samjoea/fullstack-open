import { createSlice } from '@reduxjs/toolkit';
import userServices from '../../services/users';
import { displayNotification } from './notificationReducer';

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload;
		},
	},
});

export const { setUsers } = usersSlice.actions;

export const setUsersAction = (users) => {
	return async (dispatch) => {
		const users = await userServices.getAll();
		if (users.status === 200) {
			dispatch(setUsers(users.data));
		} else {
			dispatch(displayNotification({
				message: users?.data,
				type: 'error'
			}));
		}
	};
};

export default usersSlice.reducer;