import React from 'react';
import { useClearUserData } from '../../context/UserDataContext';
import { useSetNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
	const clearUser = useClearUserData();
	const setNotification = useSetNotification();
	const getUser = JSON.parse(localStorage.getItem('user'));

	const logOut = () => {
		clearUser();
		setNotification({
			message: 'Logout Successfully',
			notificationType: 'success'
		});
	};
	return (
		<div className='w-full'>
			<div className='space-x-5 px-[3rem] flex items-center bg-gray-400'>
				<span>
					<Link className='underline text-purple-900 visited:text-gray-200 ' to='/'>blogs</Link>
				</span>
				<span>
					<Link className='underline text-purple-900 visited:text-gray-200 ' to='/users'>users</Link>
				</span>
				<span>
					{getUser?.name} logged in
				</span>
				<button
					className='border-2 btn'
					data-cy='log-out'
					onClick={logOut}
				>
               logout
				</button>
			</div>
		</div>
	);
};

export default NavigationBar;