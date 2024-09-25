import Cookies from 'cookies'

export default async function handler(req, res) {
  {
    const cookies = new Cookies(req, res)
    cookies.set('username')
    cookies.set('role')
    cookies.set('group')
    cookies.set('access_token')
    res.redirect("/")
  }
}