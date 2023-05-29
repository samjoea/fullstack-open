import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../../app/reducers/blogReducer';
import Togglable from '../../components/Togglable';
import { Link } from 'react-router-dom';
import AddBlog from '../../components/AddBlog';

const Blogs = () => {
	const componentRef = useRef();
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	return (
		<div className='h-full pb-[7rem]'>
			<div className='self-start font-bold text-2xl my-3 text-white bg-purple-900 rounded-md py-1 text-center'>Blogs</div>
			<div className='h-[80%] overflow-y-scroll '>
				<div>
					<Togglable ref={componentRef} buttonLable='create new blog' >
						<AddBlog />
					</Togglable>
				</div>
				<div data-cy='blog-posts' className='pr-5'>
					{blogs?.map(blog =>
						<div
							className='border-2 border-purple-900 rounded-md px-2 py-3 my-2 hover:bg-gray-200 ease-linear duration-300 delay-100'
							key={blog?.id} >
							<Link className='underline text-purple-700 visited:text-gray-700 hover:text-gray-800' to={`/blogs/${blog?.id}`}>
								{blog?.title}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Blogs;