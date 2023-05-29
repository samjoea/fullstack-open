import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		return {
			...state,
			message: action.message,
			type: action.notificationType,
			display: true,
		};
	case 'CLEAR_NOTIFICATION':
		return {
			...state,
			message: '',
			type: '',
			display: false,
		};
	default:
		return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [notification, dispatch] = useReducer(notificationReducer, {
		message: '',
		type: '',
		display: false,
	});

	useEffect(() => {
		if (notification.message) {
			setTimeout(() => {
				dispatch({
					type: 'CLEAR_NOTIFICATION',
				});
			}, 2000);
		}
	}, [notification]);

	const contextValue = useMemo(() => ({ notification, dispatch }), [notification, dispatch]);
	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useSetNotification = () => {
	const { dispatch } = useContext(NotificationContext);
	const setNotification = ({ message, notificationType }) => {
		dispatch({
			type: 'SET_NOTIFICATION',
			message,
			notificationType,
		});
	};
	return setNotification;
};

export const useNotification = () => {
	const { notification } = React.useContext(NotificationContext);
	return notification;
};