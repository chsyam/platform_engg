import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

export default async function getTemplateById(req, res) {
    try {
        const myurl = req.body["url"];
      const Url = `${API_URL}/${myurl}`;
      //const token = getAccessTokenCookie(req, res);
      const response = await axios.get(Url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.status === 200){
        res.status(200).json({"dpList": response.data});
      } else {
        res.status(500).json({"dpList": []});
      }
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({"dpList": []});
    }
}
  