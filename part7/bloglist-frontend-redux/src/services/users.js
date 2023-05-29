import axios from 'axios';
const baseURL = '/api/users';

const usersApi = axios.create({
	baseURL: baseURL,
});

const getAll = async () => {
	try {
		const response = await usersApi.get('/');
		return {
			status: response.status,
			data: response.data
		};
	} catch (error) {
		return {
			status: error?.response?.status,
			data: error?.response?.data?.error
		};
	}
};

const userServices = { getAll };
export default userServices;