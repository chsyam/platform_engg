import axios from 'axios';

const API_URL = process.env.API_TEMPLATE_URL+process.env.API_TEMPLATE_IP+":"+process.env.API_TEMPLATE_PORT

export async function getAllGroups(req,res) {
  try {
    const Url = `${API_URL}/getGroups/`;
    let groups = []
    const response = await axios.get(Url, {
        headers: {
            "Content-Type": "application/json",
          },
    });
    if(response.status === 200){
      groups = await response.data;
      return groups
    } else {
      throw new Error ('Failed to fetch data')
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return error
  }
}

