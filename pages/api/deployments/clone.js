import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

/*
Clone Request - curl --location 'http://10.63.35.134:8000/cloneRequest/' \
--data '{
    "id":"23",
    "username":"cathy",
    "role":"developer"
}'
*/
export default async function handler(req, res) {
    try {
        const Url = `${API_URL}/cloneRequest/`;
        req.body["username"] = "cathy";
        req.body["role"] = "developer";
        console.log("body i got is ", req.body)
        const response = await axios.post(Url, req.body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("response is ", response)
        if (response.status === 200) {
            res.status(200).json({ "message": response.data });
            console.log("clone request is sent", response.data)
        } else {
            res.status(500).json({ "message": "Error white " });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        const errorMessage = error?.response?.data?.message || 'Internal Server Error';
        res.status(500).json({ "message": errorMessage });
    }
}

