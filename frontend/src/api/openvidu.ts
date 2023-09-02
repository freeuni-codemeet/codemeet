import axios from "axios";

const createSession = async () => {
    const response = await axios.post(`/core-api/sessions/create`);
    return response.data;
};

const joinSession = async (sessionId: string) => {
    const response = await axios.post(`/core-api/sessions/join/${sessionId}`);
    return response.data;
};

const createToken = async (sessionId: string, secretToken?: string) => {
    const response = await axios.post(
        `/core-api/sessions/${sessionId}/connections/create`,
        {},
        {
            params: {secret_token: secretToken}
        }
    );
    return response.data;
};

const opneviduApi = {createSession, joinSession, createToken};
export default opneviduApi;
