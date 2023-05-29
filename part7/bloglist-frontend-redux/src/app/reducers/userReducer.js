import { createSlice } from '@reduxjs/toolkit';
import { login } from '../../services/login';
import { displayNotification } from './notificationReducer';

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			const user = JSON.parse(localStorage.getItem('user'));
			return user;
		},
		removeUser(state, action) {
			localStorage.removeItem('user');
			return null;
		},
		initializeUser(state, action) {
			const user = JSON.parse(localStorage.getItem('user'));
			return user;
		}
	},
});

export const { setUser, removeUser, initializeUser } = userSlice.actions;

export const logOut = () => {
	return async (dispatch) => {
		dispatch(removeUser());
		dispatch(displayNotification({
			message: 'Logout Successfully',
			type: 'success'
		}));
	};
};

export const logIn = (loginData) => {
	return async (dispatch) => {
		const response = await login(loginData);
		if (response.status === 200) {
			localStorage.setItem('user', JSON.stringify(response.data));
			dispatch(setUser());
			dispatch(displayNotification({
				message: 'Login Successfully',
				type: 'success'
			}));
		} else {
			dispatch(displayNotification({
				message: response?.data,
				type: 'error'
			}));
		}
	};
};

export default userSlice.reducer;