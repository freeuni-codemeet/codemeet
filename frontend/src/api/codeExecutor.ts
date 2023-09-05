import axios from "axios";

const executeCode = async (language_id: int, source_code: str, stdin: str) => {
  const response = await axios.post("/core-api/executor/execute", {
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
  });
  return response.data;
};

const codeExecutorApi = { executeCode };

export default codeExecutorApi;