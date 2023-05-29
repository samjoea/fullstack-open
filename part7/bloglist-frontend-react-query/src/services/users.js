import axios from 'axios';

const baseUrl = '/api/users';

const usersApi = axios.create({
	baseURL: baseUrl,
});

const getAll = async () => {
	const request = await usersApi.get('/');
	return request?.data;
};

const userServices = { getAll };
export default userServices;