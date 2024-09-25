import axios from "axios";

export const handleFetchUrlByKey = async(key) => {
    try {
        const response = await axios.post('/api/services/getUrlByKey',{"key": key});
        if (response.status === 200) {
            return response.data["url"];
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
}

export const handleFetchListByUrl = async(url) => {
    try {
        const response = await axios.post('/api/services/getDataByUrl',{"url":url});
        if (response.status === 200) {
            return  response.data["dpList"];
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}


