import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function getTemplateById(req, res) {
	try {
		const Url = `${API_URL}/getTemplateById/`;
		const response = await axios.post(Url, req.body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {

			const template = await response.data;
			return template;
		} else {
			throw new Error('Failed to fetch template')
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return error
	}
}
