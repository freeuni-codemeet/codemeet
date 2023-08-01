import axios from "axios";

const APPLICATION_SERVER_URL = 'http://localhost:6969';

const createSession = async () => {
    const response = await axios.post(`${APPLICATION_SERVER_URL}/api/sessions/create`, {
        headers: {'Content-Type': 'application/json',},
    });
    return response.data;
}

const joinSession = async (sessionId: string) => {
    const response = await axios.post(`${APPLICATION_SERVER_URL}/api/sessions/join/${sessionId}`, {
        headers: {'Content-Type': 'application/json',},
    });
    return response.data;
}

const createToken = async (sessionId: string) => {
    const response = await axios.post(`${APPLICATION_SERVER_URL}/api/sessions/${sessionId}/connections/create`, {
        headers: {'Content-Type': 'application/json',},
    });
    return response.data;
}

const opneviduApi = {createSession, joinSession, createToken}
export default opneviduApi;