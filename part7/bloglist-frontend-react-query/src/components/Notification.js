import React from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
	const { type, message, display } = useNotification();
	const typeColor = {
		success: 'green',
		error: 'red',
	};

	if (!message) return null;

	return display ? (
		<div>
			<div
				className='bg-gray-300 text-xl mx-auto text-center py-1'
				data-cy='notification-box'
				style={{
					color: typeColor[type],
					border: `2px solid ${typeColor[type]}`,
				}}
			>
				{message}
			</div>
		</div>
	) : null;
};

export default Notification;