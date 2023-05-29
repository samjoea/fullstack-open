import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './app/reducers/blogReducer';
import { logOut } from './app/reducers/userReducer';

const App = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user);
	const userToken = JSON.parse(localStorage.getItem('user'))?.token;
	const componentRef = useRef();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	if (!userToken) {
		return(
			<div>
				<div>Log in to application</div>
				<Notification />
				<LoginForm />
			</div>
		);
	}

	return (
		<div>
			<h1>blogs</h1>
			<Notification />
			<div>
				{user?.name} logged in
				<button
					data-cy='log-out'
					onClick={() => dispatch(logOut())}
				>
					logout
				</button>
			</div>
			<br />
			<div>
				<Togglable ref={componentRef} buttonLable='create new blog' >
					<AddBlog />
				</Togglable>
			</div>
			<div data-cy='blog-posts'>
				{blogs?.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
