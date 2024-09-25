import axios from 'axios';
import getAccessTokenCookie from '../../../components/utils';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export async function getAllTemplates(req, res, username, roles, groups) {
	try {
		const Url = `${API_URL}/listTemplates/?name=${username}&roles=${roles}&group=${groups}`;
		console.log("fetching template ",Url)
		const token = getAccessTokenCookie(req, res);
		let templates = []
		const response = await axios.get(Url, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
		});
		if (response.status === 200) {
			templates = await response.data;
			console.log("template list is ",templates)
			return templates
		} else {
			throw new Error('Failed to fetch data')
			return []
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return []
	}
}

