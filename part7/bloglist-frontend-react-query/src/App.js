import React from 'react';
import { useUserData } from './context/UserDataContext';
import Users from './routes/user/Users';
import NavigationBar from './routes/header/NavigationBar';
import Blogs from './routes/blogs/Blogs';
import Login from './routes/auth/Login';
import { Route, Routes } from 'react-router-dom';
import User from './routes/user/User';
import BlogView from './routes/blogs/BlogView';
import Notification from './components/Notification';
import './index.css';

const App = () => {
	const userToken = useUserData()?.token;

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
