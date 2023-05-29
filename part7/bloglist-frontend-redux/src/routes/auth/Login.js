import React from 'react';
import LoginForm from '../../components/LoginForm';

const Login = () => {
	return(
		<div className='h-[70%] flex flex-col justify-center items-center'>
			<div className='text-center text-2xl font-bold capitalize bg-purple-900 rounded-md py-1 w-full text-white'>Log in to application</div>
			<LoginForm />
		</div>
	);
};

export default Login;