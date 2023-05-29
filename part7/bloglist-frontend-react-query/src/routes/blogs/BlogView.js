import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { removeBlog, updateBlog } from '../../services/blogs';
import { useSetNotification } from '../../context/NotificationContext';
import { useMatch, useNavigate } from 'react-router-dom';
import Comments from '../../components/Comments';
import { useUserData } from '../../context/UserDataContext';

const BlogView = () => {
	const setNotification = useSetNotification();
	const userName = useUserData().username;
	const queryClient = useQueryClient();
	const match = useMatch('/blogs/:id');
	const navigate = useNavigate();
	const blogId = match?.params?.id;
	const blogs = queryClient.getQueryData(['blogs']);
	const [blog, setBlog] = useState(() => blogs?.find(blog => blog.id === blogId));

	const hideRemoveButton = {
		display: blog?.user?.username === userName ? '' : 'none'
	};
	const addLikes = useMutation({
		mutationFn: updateBlog,
		onSuccess: (apiData) => {
			queryClient.invalidateQueries(['blogs']);
			setBlog(prev => ({ ...prev, likes: apiData.data.likes }));
		},
		onError: (error) => {
			setNotification({
				message: error?.response?.data?.error,
				notificationType: 'error'
			});
		}
	});

	const deleteBlog = useMutation({
		mutationFn: removeBlog,
		onSuccess: () => {
			const oldData = queryClient.getQueryData(['blogs']);
			const newData = oldData.filter(nblog => nblog.id !== blog.id);
			queryClient.setQueryData(['blogs'], newData);
			setNotification({ message: 'Blog Deleted', notificationType: 'success' });
		},
		onError: (error) => {
			setNotification({ message: error.data, notificationType: 'error' });
		}
	});

	if (!blog) return null;

	const handleLike = () => {
		const blogUpdate = {
			likes: blog.likes + 1
		};
		addLikes.mutate({ id: blogId, blogUpdate });
	};

	const handleRemove = () => {
		const askUser = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
		if (askUser) {
			deleteBlog.mutate(blogId);
			navigate('/');
		}
	};

	return (
		<div className='text-base'>
			<h2 className='self-start font-bold text-xl mb-2 text-white pl-3 border bg-purple-900 py-1 rounded-md mt-3'>{blog?.title}</h2>
			<a className='underline '  href={`${blog?.url}`}>{blog?.url}</a>
			<div>
				{blog?.likes} likes
				<button onClick={handleLike} className='border btn my-2 py-1 ml-1 text-base'>like</button>
			</div>
			<p>added by <span className='text-purple-900 font-bold'>{blog?.user?.name}</span></p>
			<button
				style={hideRemoveButton}
				onClick={handleRemove}
				className='border btn py-1 text-base mt-2'
			>remove</button>
			<Comments />
		</div>
	);
};

export default BlogView;