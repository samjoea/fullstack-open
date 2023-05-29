import React from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../app/reducers/userReducer';

const LoginForm = () => {
	const dispatch = useDispatch();

	const handleSumbit = (e) => {
		e.preventDefault();
		const { username, password } = e.target.elements;
		const loginData = {
			username: username.value,
			password: password.value,
		};
		dispatch(logIn(loginData));
	};

	return (
		<div>
			<form onSubmit={handleSumbit} >
				<div>
					username: <input
						type="text"
						name="username"
					/>
				</div>
				<div>
					password: <input
						type="password"
						name="password"
					/>
				</div>
				<button
					data-cy='login-submit'
					type="submit"
				>
					login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
