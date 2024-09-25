import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function handler(req, res) {
  try {
    const Url = `${API_URL}/getDescriptionsForDropDown/`;
    let listApis = []
    // Make the POST request to Keycloak
    const response = await axios.get(Url, {
        headers: {
            "Content-Type": "application/json",
          },
    });
    if(response.status === 200){
      res.status(200).json({"listApis": response.data});
    } else {
      res.status(500).json({"listApis": []});
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ "listApis": [] });
  }
}

