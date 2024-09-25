import axios from 'axios';
import getAccessTokenCookie from '../../../../components/utils';
const API_URL = process.env.API_URL + process.env.API_SERVER_IP + ":" + process.env.API_SERVER_PORT;

export default async function deleteById(userId) {
  try {
    const Url = `${API_URL}/userApp/users/`;
    // const token = getAccessTokenCookie(req, res);
    const response = await axios.delete(Url, { "id": '8aef17d1-c92b-4065-b448-99359fa1aa5e' }, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
    });

    console.log("user deleted !! ", response.data["message"])
    response.status(200).json({ message: response.data["message"] });
  } catch (error) {
    console.error('An error occurred:', error);
    return error
  }
}
