import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_TEMPLATE_URL + process.env.NEXT_PUBLIC_API_TEMPLATE_IP + ":" + process.env.NEXT_PUBLIC_API_TEMPLATE_PORT

const deleteById = async (templateId) => {
    try {
        const response = await axios.post("http://10.63.17.1:32244/deleteTemplate/", { "id": templateId }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            //const template = await response.data;
            //.log("delete item ",template)
            return "deleted Succesfully";
        } else {
            throw new Error('Failed to delete template')
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return error
    }
}

export default deleteById;