import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export async function getAllServices(username, roles, groups) {
	try {
		const Url = `${API_URL}/listRequests/?name=${username}&roles=${roles}&group=${groups}`;
		let services = []
		const response = await axios.get(Url, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			services = await response.data;
			return services.map(item => ({ ...item, visible: false }));
		} else {
			throw new Error('Failed to fetch data')
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return error
	}
}