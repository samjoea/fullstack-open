import axios from 'axios';
const baseUrl = '/api/blogs';
const token = JSON.parse(localStorage.getItem('user'))?.token;

const blogApi = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'bearer ' + token
	}
});

const getAll = async () => {
	const request = await blogApi.get('/');
	return request?.data;
};

const addNewBlog = async (blog) => {
	const response = await blogApi.post('/',blog);
	return {
		status: response?.status,
		data: response?.data
	};
};

const updateBlog = async ({ id, blogUpdate }) => {
	const response = await blogApi.put(`/${id}`, blogUpdate);
	return {
		status: response?.status,
		data: response?.data
	};
};

const removeBlog = async (id) => {
	const response = await blogApi.delete(`/${id}`);
	return {
		status: response?.status,
		data: response?.data
	};
};

const addComment = async ({ id, comment }) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
	return {
		status: response?.status,
		data: response?.data
	};
};

export { getAll, addNewBlog, updateBlog, removeBlog, addComment };
