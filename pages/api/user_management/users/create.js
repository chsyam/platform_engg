import axios from 'axios';
import getAccessTokenCookie from '../../../../components/utils';
const API_URL = process.env.API_URL + process.env.API_SERVER_IP + ":" + process.env.API_SERVER_PORT;

export default async function handler(req, res) {
	try {
		const Url = `${API_URL}/userApp/users/`;
		console.log("user added !! ", req.body)
		const token = getAccessTokenCookie(req, res);
		const response = await axios.post(Url, req.body, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			},
		});

		console.log("user added !! ", response.data["message"])
		res.status(200).json({ message: response.data["message"] });
	} catch (error) {
		console.error('An error occurred:', error.response);
		const errorMessage = error.response.data.message || 'Internal Server Error';
		res.status(error.response?.status || 500).json({ message: errorMessage });
	}
}
