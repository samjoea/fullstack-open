import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		message: '',
		type: '',
		display: false,
	},
	reducers: {
		setNotification(state, action) {
			const { type, message } = action.payload;
			return { ...state, type, message, display: true };
		},
		removeNotification(state, action) {
			return { ...state, type: '', message: '', display: false };
		},
	},
});


export const { setNotification, removeNotification } = notificationSlice.actions;

export const displayNotification = (data) => {
	return async (dispatch) => {
		dispatch(setNotification(data));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 2000);
	};
};

export default notificationSlice.reducer;