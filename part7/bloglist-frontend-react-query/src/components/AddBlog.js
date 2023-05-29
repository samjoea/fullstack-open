import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { addNewBlog } from '../services/blogs';
import { useSetNotification } from '../context/NotificationContext';

const AddBlog = () => {
	const queryClient = useQueryClient();
	const setNotification = useSetNotification();

	const blogData = useMutation({
		mutationFn: addNewBlog,
		onSuccess: (apiData) => {
			const oldData = queryClient.getQueryData(['blogs']);
			const newData = apiData?.data;
			queryClient.setQueryData(['blogs'], [...oldData, newData]);
			setNotification({
				message: `a new blog ${apiData?.data?.title} was added`,
				notificationType: 'success'
			});
		},
		onError: (error) => {
			setNotification({
				message: error?.response?.data?.error,
				notificationType: 'error'
			});
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const { title, author, url } = e.target.elements;
		const blog = {
			title: title.value,
			author: author.value,
			url: url.value,
		};
		blogData.mutate(blog);
		e.target.reset();
	};

	return (
		<div className='w-[70%] mb-2'>
			<div className='my-2 capitalize font-semibold'>Create new blog</div>
			<form
				className='space-y-3 flex flex-col'
				onSubmit={handleSubmit}>
				<div className='flex items-center'>
					<label
						className='flex-[0.2] font-semibold'
						htmlFor="title">Title: </label>
					<input
						data-cy='blog-title'
						type="text"
						name="title"
						className='input'
					/>
				</div>
				<div className='flex items-center'>
					<label
						className='flex-[0.2] font-semibold'
						htmlFor="author">Author: </label>
					<input
						data-cy='blog-author'
						type="text"
						name="author"
						className='input'
					/>
				</div>
				<div className='flex items-center'>
					<label
						className='flex-[0.2] font-semibold'
						htmlFor="url">Url: </label>
					<input
						data-cy='blog-url'
						type="text"
						name="url"
						className='input'
					/>
				</div>
				<button
					data-cy='blog-submit'
					type="submit"
					id='create'
					className='border-2 btn'
				>
					create
				</button>
			</form>
		</div>
	);
};

export default AddBlog;