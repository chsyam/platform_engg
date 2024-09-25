import axios from 'axios';
const API_URL = process.env.API_GATEWAY_URL + process.env.API_GATEWAY_IP + ":" + process.env.API_GATEWAY_PORT

export async function getAlerts(req, res) {
    try {
        const Url = `http://10.63.17.1:30276/alertsSummary`;
        const response = await axios.get(Url, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const alerts = await response.data;
            console.log(alerts)
            return alerts;
        } else {
            throw new Error('Failed to fetch data')
            return [];
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}