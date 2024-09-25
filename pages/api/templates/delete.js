import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT
export default async function handler(req, res){
    try {
        const response = await axios.post(`${API_URL}/deleteTemplate/`, req.body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            res.status(200).json({ message: response.data });
        }
        else{
            res.status(response.status).json({ message: response.data });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ message: response.data });
    }
}
