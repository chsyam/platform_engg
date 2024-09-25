import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function handler(req, res) {
	try {
		const Url = `${API_URL}/createTemplate/`;
		console.log("req body is ",req.body)
		const response = await axios.post(Url, req.body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		res.status(200).json({ message: response.data });
	} catch (error) {
		console.error('An error occurred:', error.response);
		const errorMessage = error.response.data.message || 'Internal Server Error';
		res.status(error.response?.status || 500).json({ message: errorMessage });
	}
}
