import axios from 'axios';
import getAccessTokenCookie from '../../../components/utils/index';

const API_URL = process.env.API_URL + process.env.API_SERVER_IP + ":" + process.env.API_SERVER_PORT

export async function getAllUsersLatest(token) {
	try {
		const Url = `http://10.63.17.1:31417/userApp/allUsersDetails/`;
		let users = []
		const response = await axios.get(Url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			users = response.data;
			return users
		} else {
			throw new Error('Failed to fetch data')
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return error
	}
}