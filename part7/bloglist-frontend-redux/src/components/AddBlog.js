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
		<div>
			<div>Create new blog</div>
			<form onSubmit={handleSubmit}>
				<div>
					title: <input
						data-cy='blog-title'
						type="text"
						name="title"
					/>
				</div>
				<div>
					author: <input
						data-cy='blog-author'
						type="text"
						name="author"
					/>
				</div>
				<div>
					url: <input
						data-cy='blog-url'
						type="text"
						name="url"
					/>
				</div>
				<button
					data-cy='blog-submit'
					type="submit"
					id='create'
				>
					create
				</button>
			</form>
		</div>
	);
};

export default AddBlog;