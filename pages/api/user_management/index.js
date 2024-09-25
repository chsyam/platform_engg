import axios from 'axios';
import getAccessTokenCookie from '../../../components/utils/index';

const API_URL = process.env.API_URL + process.env.API_SERVER_IP + ":" + process.env.API_SERVER_PORT

export async function getAllUsers(req, res) {
	try {
		const Url = `${API_URL}/userApp/allUsersDetails/`;
		const token = getAccessTokenCookie(req, res);
		let users = []
		const response = await axios.get(Url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			users = await response.data;
			return users
		} else {
			throw new Error('Failed to fetch data')
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return error
	}
}

