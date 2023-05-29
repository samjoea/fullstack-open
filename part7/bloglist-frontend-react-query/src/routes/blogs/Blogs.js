import React, { useRef } from 'react';
import Togglable from '../../components/Togglable';
import AddBlog from '../../components/AddBlog';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../../services/blogs';
import { Link } from 'react-router-dom';

const Blogs = () => {
	const componentRef = useRef();
	const { data: blogs } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAll,
	});

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
					{blogs?.sort((blog1, blog2) => blog2.likes - blog1.likes)?.map(blog =>
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