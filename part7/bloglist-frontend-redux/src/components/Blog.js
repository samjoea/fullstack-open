import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlogData, updateBlogLikes } from '../app/reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

const Blog = ({ blog }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userName = useSelector((state) => state.user?.username);
	const [visible, setVisible] = useState(false);
	const showWhenVisible = { display: visible ? '' : 'none' };
	const hideRemoveButton = { display: blog?.user?.username === userName ? '' : 'none' };
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

	const handleRemove = () => {
		const askUser = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
		if (askUser) {
			navigate('/');
			dispatch(removeBlogData(blog.id));
		}
	};

	const handleLikes = () => {
		dispatch(updateBlogLikes(blog));
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
							onClick={handleLikes}
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

Blog.propTypes = {
	blog: PropTypes.shape({}).isRequired,
	userName: PropTypes.string,
};

export default Blog;
