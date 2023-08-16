import axios from "axios";

const createSession = async () => {
    const response = await axios.post(`/core-api/sessions/create`, {
        headers: {'Content-Type': 'application/json',},
    });
    return response.data;
}

const joinSession = async (sessionId: string) => {
    const response = await axios.post(`/core-api/sessions/join/${sessionId}`, {
        headers: {'Content-Type': 'application/json',},
    });
    return response.data;
}

const createToken = async (sessionId: string) => {
    const response = await axios.post(`/core-api/sessions/${sessionId}/connections/create`, {
        headers: {'Content-Type': 'application/json',},
    });
    return response.data;
}

const opneviduApi = {createSession, joinSession, createToken}
export default opneviduApi;