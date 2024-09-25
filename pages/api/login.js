import Cookies from 'cookies'
import axios from 'axios';
import * as qs from 'qs'
import encrypt from '../../components/utils/encryption';

const API_URL = process.env.API_URL + process.env.API_SERVER_IP + ":" + process.env.API_SERVER_PORT

export default async function handler(req, res) {
	const username = req.body['username']
	const password = encrypt(req.body['password']);
	try {
		const keycloakUrl = `${API_URL}/userApp/login/`;
		const data = qs.stringify({ 'username': username, 'password': password });

		const response = await axios.post(keycloakUrl, data, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		if (response.status === 200) {
			try {
				const token = response.data["data"]["access_token"];
				const roles = response.data["data"]["roles"];
				const groups = response.data["data"]["groups"];
				const cookies = new Cookies(req, res)
				cookies.set('username', username)
				cookies.set('roles', JSON.stringify(roles))
				cookies.set('groups', JSON.stringify(groups))
				cookies.set('access-token', token,
					{ expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }
				)
				if (roles?.includes("developer")) {
					res.redirect("/deployments")
				}
				res.redirect("/")
			} catch (error) {
				console.log('Failed to parse the response ', error)
				res.redirect(`/errorMsgRedirection?message=${response.data}`)
			}
		} else {
			console.error('Failed to get token from Keycloak');
			console.log(response.data)
			res.redirect(`/errorMsgRedirection?message=${response.data}`)
		}
	} catch (error) {
		console.error('An error occurred:', error);
		res.redirect(`/errorMsgRedirection?message=Internal Server Error`)
	}
}