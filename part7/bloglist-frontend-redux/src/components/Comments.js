import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComments } from '../app/reducers/blogReducer';

const Comments = ({ blogId }) => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);
	const comments = blogs?.find(blog => blog.id === blogId)?.comments;

	const handleSubmit = (e) => {
		e.preventDefault();
		const comment = e.target.comment.value;
		dispatch(addComments({ id: blogId, comment }));
		e.target.reset();
	};

	return (
		<div className='mt-2'>
			<h3 className='self-start font-bold text-xl text-center mb-3 text-white bg-purple-900 py-1 rounded-md'>Comments</h3>
			<form onSubmit={handleSubmit} >
				<input
					name='comment'
					type='text'
					required
					className='input'
				/>
				<button className='border btn my-2 ml-1'>add comment</button>
			</form>
			<div className='h-[7rem] w-full overflow-x-scroll py-2 flex '>
				{comments?.map(({ comment }) => (
					<div
						className='border-2 ml-3 border-purple-900 min-w-[15rem]  rounded-md p-1'
						key={comment}>
						{comment}
					</div>
				))}
			</div>
		</div>
	);
};

export default Comments;