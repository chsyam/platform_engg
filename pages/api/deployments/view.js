import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function handler(req, res) {
  try {
    const Url = `${API_URL}/getProvisionedDetailsById/`;
    const response = await axios.post(Url, req.body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response of view popup ",response.data)
    if(response.status === 200){
      res.status(200).json({"message": response.data});
    } else {
      res.status(500).json({"message": "Error white " });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    const errorMessage = error?.response?.data?.message || 'Internal Server Error';
    res.status(500).json({ "message": errorMessage });
  }
}

