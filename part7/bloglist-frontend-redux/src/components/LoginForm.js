import React from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../app/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = e.target.elements;
		const loginData = {
			username: username.value,
			password: password.value,
		};
		dispatch(logIn(loginData));
		navigate('/');
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
