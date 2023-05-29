import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/login';
import { useSetNotification } from '../context/NotificationContext';
import { useSetUserData } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const setNotification = useSetNotification();
	const setUser = useSetUserData();
	const navigate = useNavigate();

	const loginUser = useMutation({
		mutationFn: login,
		onSuccess: (apiData) => {
			setUser(apiData?.data);
			setNotification({ message: 'Login Successful', notificationType: 'success' });
			navigate('/');
		},
		onError: (error) => {
			setNotification({ message: error?.response?.data?.error, notificationType: 'error' });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = e.target.elements;
		const loginData = {
			username: username.value,
			password: password.value,
		};
		loginUser.mutate(loginData);
	};

	return (
		<div className='flex justify-center items-center w-[80%] h-[60%]'>
			<form
				className='space-y-3 flex flex-col w-[80%]'
				onSubmit={handleSubmit} >
				<div className='flex items-center'>
					<label
						className='flex-[0.3] text-base font-bold'
						htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						className='input'
					/>
				</div>
				<div className='flex items-center'>
					<label
						className='flex-[0.3] text-base font-bold'
						htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						className='input'
					/>
				</div>
				<button
					data-cy='login-submit'
					type="submit"
					className='border-2 btn'
				>
					login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
