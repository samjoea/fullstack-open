import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const { type, message, display } = useSelector((state) => state.notification);

	const typeColor = {
		success: 'green',
		error: 'red',
	};

	if (!message) return null;

	return display ? (
		<div>
			<br />
			<div data-cy='notification-box' style={{
				color: typeColor[type],
				fontSize: '20px',
				paddingTop: '8px',
				paddingBottom: '8px',
				paddingLeft: '10px',
				border: `3px solid ${typeColor[type]}`,
				borderRadius: '5px',
				backgroundColor: 'lightgrey',
			}}
			>
				{message}
			</div>
			<br />
		</div>
	) : null;
};

export default Notification;