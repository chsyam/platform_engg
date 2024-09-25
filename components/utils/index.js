import Cookies from 'cookies'

export default function getAccessTokenCookie(req, res) {
  const cookies = new Cookies(req, res)
	const token = cookies.get('access-token')
  return token;
}