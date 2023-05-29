import React, { useEffect } from 'react';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './app/reducers/blogReducer';
import NavigationBar from './routes/header/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Login from './routes/auth/Login';
import Blogs from './routes/blogs/Blogs';
import BlogView from './routes/blogs/BlogView';
import Users from './routes/user/Users';
import User from './routes/user/User';
import { setUsersAction } from './app/reducers/usersReducer';
import { initializeUser } from './app/reducers/userReducer';
import './index.css';

const App = () => {
	const dispatch = useDispatch();
	const userToken = useSelector(state => state?.user?.token);

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(setUsersAction());
		dispatch(initializeUser());
	}, [dispatch]);

	return (
		<div className='w-full h-screen bg-purple-900 to-white bg-gradient-to-bl border grid place-content-center'>
			<div className='border w-[40rem] box-border bg-gray-300  h-[40rem] overflow-hidden relative'>
				<Notification />
				{userToken && <NavigationBar />}
				<div className='px-[3rem] pb-[3rem] h-full'>
					<h1 className='my-[2rem] capitalize  w-full text-center text-3xl font-bold text-purple-900'>blog app</h1>
					{
						!userToken
							? <Login />
							: (
								<>
									<Routes>
										<Route path='/' element={<Blogs />} />
										<Route path='/blogs' element={<Blogs />} />
										<Route path='/blogs/:id' element={<BlogView />} />
										<Route path='/users' element={<Users />} />
										<Route path='/users/:id' element={<User />} />
									</Routes>
								</>
							)
					}
				</div>
			</div>
		</div>
	);
};

export default App;
