import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function getEnvName(req, res, serviceName) {
	try {
		const Url = `${API_URL}/fetchSvcEnv/?name=${serviceName}`;
		const response = await axios.get(Url);
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
