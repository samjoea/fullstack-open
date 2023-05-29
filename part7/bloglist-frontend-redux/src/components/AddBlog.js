import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewBlog } from '../app/reducers/blogReducer';

const AddBlog = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { title, author, url } = e.target.elements;
		const inputData = {
			title: title.value,
			author: author.value,
			url: url.value,
		};
		dispatch(createNewBlog(inputData));
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