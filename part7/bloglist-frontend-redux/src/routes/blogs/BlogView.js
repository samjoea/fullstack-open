import React from 'react';
import Comments from '../../components/Comments';
import { useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlogData, updateBlogLikes } from '../../app/reducers/blogReducer';

const BlogView = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const match = useMatch('/blogs/:id');
	const blogId = match?.params?.id;
	const blogs = useSelector((state) => state.blogs);
	const userName = useSelector((state) => state.user.username);
	const blog = blogs?.find(blog => blog.id === blogId);
	const hideRemoveButton = { display: blog?.user?.username === userName ? '' : 'none' };

	const handleRemove = () => {
		const askUser = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
		if (askUser) {
			dispatch(removeBlogData(blog.id));
			navigate('/');
		}
	};

	const handleLikes = () => {
		dispatch(updateBlogLikes(blog));
	};

	return (
		<div className='text-base'>
			<h2 className='self-start font-bold text-xl mb-2 text-white pl-3 border bg-purple-900 py-1 rounded-md mt-3'>
				{blog?.title}
			</h2>
			<a
				className='underline'
				href={`${blog?.url}`}
			>
				{blog?.url}
			</a>
			<div>
				{blog?.likes} likes
				<button onClick={handleLikes} className='border btn my-2 py-1 ml-1 text-base'>like</button>
			</div>
			<p>added by <span className='text-purple-900 font-bold'>{blog?.user?.name}</span></p>
			<button
				style={hideRemoveButton}
				onClick={handleRemove}
				className='border btn py-1 text-base mt-2'
			>
				remove
			</button>
			<Comments blogId={blogId} />
		</div>
	);
};

export default BlogView;