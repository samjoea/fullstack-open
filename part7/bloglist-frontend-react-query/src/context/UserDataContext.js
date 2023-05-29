import { createContext, useContext, useLayoutEffect, useMemo, useReducer } from 'react';

const userDataReducer = (state, action) => {
	switch (action.type) {
	case 'SET_USER_DATA': {
		localStorage.setItem('user', JSON.stringify(action.userData));
		return JSON.parse(localStorage.getItem('user'));
	}
	case 'CLEAR_USER_DATA': {
		localStorage.removeItem('user');
		return null;
	}
	case 'LOGGED_IN': {
		return JSON.parse(localStorage.getItem('user'));
	}
	default:
		return state;
	}
};

const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
	const [userData, dispatch] = useReducer(userDataReducer, {
		userData: null,
	});

	useLayoutEffect(() => {
		dispatch({
			type: 'LOGGED_IN',
		});
	}, []);

	const contextValue = useMemo(() => ({ userData, dispatch }), [userData, dispatch]);
	return (
		<UserDataContext.Provider value={contextValue}>
			{children}
		</UserDataContext.Provider>
	);
};

export const useUserData = () => {
	const { userData } = useContext(UserDataContext);
	return userData;
};

export const useSetUserData = () => {
	const { dispatch } = useContext(UserDataContext);
	const setUserData = (userData) => {
		dispatch({
			type: 'SET_USER_DATA',
			userData,
		});
	};
	return setUserData;
};

export const useClearUserData = () => {
	const { dispatch } = useContext(UserDataContext);
	const clearUserData = () => {
		dispatch({
			type: 'CLEAR_USER_DATA',
		});
	};
	return clearUserData;
};