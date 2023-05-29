import { createSlice } from '@reduxjs/toolkit';
import { addNewBlog, getAll, removeBlog, updateBlog } from '../../services/blogs';
import { displayNotification } from './notificationReducer';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		addBlog(state, action) {
			return [...state, action.payload];
		},
		blogUpdate(state, action) {
			const blog = action.payload;
			return state
				.map((item) => item.id === blog.id ? blog : item)
				.sort((a, b) => b.likes - a.likes);
		},
		deleteBlog(state, action) {
			const id = action.payload;
			return state.filter((item) => item.id !== id);
		}
	}
});

export const { setBlogs, addBlog, blogUpdate, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await getAll();
		dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
	};
};

export const createNewBlog = (blog) => {
	return async (dispatch) => {
		const newBlog = await addNewBlog(blog);
		if (newBlog.status === 201) {
			dispatch(addBlog(newBlog.data));
			dispatch(displayNotification({
				message: `a new blog ${newBlog?.data?.title} was added`,
				type: 'success'
			}));
		} else {
			dispatch(displayNotification({
				message: newBlog.data,
				type: 'error'
			}));
		}
	};
};

export const updateBlogLikes = (blog) => {
	return async (dispatch) => {
		const likes = {
			likes: blog.likes + 1
		};
		const updatedBlog = await updateBlog(blog.id, likes);
		if (updatedBlog.status === 200) {
			dispatch(blogUpdate(updatedBlog.data));
		} else {
			dispatch(displayNotification({
				message: updatedBlog.data,
				type: 'error'
			}));

		}
	};
};

export const removeBlogData = (id) => {
	return async (dispatch) => {
		const response = await removeBlog(id);
		if (response.status === 204) {
			dispatch(deleteBlog(id));
			dispatch(displayNotification({
				message: 'Blog Deleted',
				type: 'success'
			}));
		} else {
			dispatch(displayNotification({
				message: response.data,
				type: 'error'
			}));

		}
	};
};

export default blogSlice.reducer;