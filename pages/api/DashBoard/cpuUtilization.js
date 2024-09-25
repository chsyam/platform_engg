import axios from 'axios';

export async function getCpuUtilization(req, res) {
	try {
		const response = await axios.get("http://marvel-platformengineering-576758462.us-east-1.elb.amazonaws.com:92/get-consolidated-cpu-metrics");
		if (response.status === 200) {
			cpuUtil = response.data;
			return cpuUtil;
		} else {
			throw new Error('Failed to fetch data')
		}
	} catch (error) {
		console.error('An error occurred:', error);
		return error
	}
}

