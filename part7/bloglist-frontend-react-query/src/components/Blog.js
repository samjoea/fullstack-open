import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeBlog, updateBlog } from '../services/blogs';
import { useSetNotification } from '../context/NotificationContext';
import { useUserData } from '../context/UserDataContext';

const Blog = ({ blog }) => {
	const setNotification = useSetNotification();
	const queryClient = useQueryClient();
	const userName = useUserData().username;

	const [visible, setVisible] = useState(false);

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

	const addLikes = useMutation({
		mutationFn: updateBlog,
		onSuccess: () => {
			queryClient.invalidateQueries(['blogs']);
		},
		onError: (error) => {
			setNotification({
				message: error?.response?.data?.error,
				notificationType: 'error'
			});
		}
	});

	const showWhenVisible = { display: visible ? '' : 'none' };
	const hideRemoveButton = {
		display: blog?.user?.username === userName ? '' : 'none'
	};

	const blogStyle = {
		border: '2px solid black',
		padding: '5px',
		margin: '2px',
	};
	const removeStyle = {
		backgroundColor: 'lightblue',
		borderRadius: '8px',
	};

	const toggleVisibility = () => {
		setVisible(prev => !prev);
	};

	const handleLike = () => {
		const blogUpdate = {
			likes: blog.likes + 1
		};
		addLikes.mutate({ id: blog.id, blogUpdate });
	};

	const handleRemove = () => {
		const askUser = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
		if (askUser) {
			deleteBlog.mutate(blog.id);
		}
	};

	return(
		<div>
			<div className='blog' style={{ ...blogStyle }}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility} >{ visible ? 'hide': 'view' }</button>
				<div className='more-blog-info' style={{ ...showWhenVisible }}>
					<div>{blog.url}</div>
					<div>
					likes <span data-cy='number-of-likes'>{blog.likes}</span>
						<button
							data-cy='add-likes'
							onClick={handleLike}
						>
							like
						</button>
					</div>
					<div>{blog?.user?.name}</div>
					<div style={hideRemoveButton}>
						<button
							data-cy='blog-delete'
							style={removeStyle}
							onClick={handleRemove}
						>
							remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;
