import axios from 'axios';
import getAccessTokenCookie from '../../../../../components/utils';
const API_URL = process.env.API_URL + process.env.API_SERVER_IP + ":" + process.env.API_SERVER_PORT;

const handler = async (req, res) => {
  try {
    const { username } = req.query;
    console.log("#################### ",username)
    const Url = `${API_URL}/userApp/users/${username}/`;
    console.log("url => ", Url)
    const token = getAccessTokenCookie(req, res);
    const response = await axios.delete(Url, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    console.log("user deleted !! ", response.data["message"]);
    res.status(200).json({ message: response.data["message"] });
  } catch (error) {
    console.error('An error occurred:', error);
    const errorMessage = error.response?.data.message || 'Internal Server Error';
    res.status(error.response?.status || 500).json({ message: errorMessage });
  }
};

export default handler;
