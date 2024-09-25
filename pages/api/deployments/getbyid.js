import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function getRequestById(req, res) {
	try {
		const Url = `${API_URL}/getRequestById/`;
		const response = await axios.post(Url, req.body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {

			const request = await response.data;
			return request;
		} else {
			throw new Error('Failed to fetch request')
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return error
	}
}
