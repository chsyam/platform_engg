import axios from "axios";

const API_URL = process.env.API_BUDGET_URL + process.env.API_BUDGET_IP + ":" + process.env.API_BUDGET_PORT

export async function getBudget(req, res) {
    try {
        const Url = `${API_URL}/getGroupBudget/`;
        const response = await axios.get(`${Url}`);
        if (response.status === 200) {
            let budget = await response.data;
            return budget
        } else {
            throw new Error('Failed to fetch buget')
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
        return error
    }
}