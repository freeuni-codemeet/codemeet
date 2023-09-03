import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import VideoChat from "./VideoChat";
import Modal from "../../components/Modal";
import UsernameInputModal from "./UsernameInputModal";
import Executor from "./Executor";
import axios from "axios";

const Room = () => {
  const { state } = useLocation();
  const { sessionId } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("python");

  const languageIdMap = {
    python: 92,
    java: 62,
    cpp: 54,
    c: 48,
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const executeCode = async () => {
    try {
      const encoded_code = btoa("print('Hello world')");
      const encoded_stdin = btoa(codeInput);
      console.log(codeInput);
      const response = await axios.post("/core-api/executor/execute", {
        language_id: languageIdMap[selectedLanguage],
        source_code: encoded_code,
        stdin: encoded_stdin,
      });
      console.log("Compilation result:", response.data);
    } catch (error) {
      console.error("Error compiling:", error);
    }
  };

  const getAppropriateElement = (
    sessionId: string | undefined,
    username: string | undefined
  ) => {
    if (sessionId) {
      if (username && username !== "") {
        return (
          <>
            <div className={"w-1/4"}>
              <VideoChat
                sessionId={sessionId}
                username={username}
                secretToken={state?.secretToken}
              />
            </div>
            <div className={"w-3/4"}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <button
                    onClick={executeCode}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Execute
                  </button>
                </div>
                <div>
                  <label htmlFor="languageSelect">Select Language:</label>
                  <select
                      id="languageSelect"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      className="ml-2 p-2 border border-gray-400 rounded bg-blue-500 text-white"
                    >
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="c">C</option>
                    </select>
                </div>
              </div>
              <CodeEditor sessionId={sessionId} username={username} />
              <Executor />
            </div>
          </>
        );
      } else {
        return (
          <Modal open={true}>
            <UsernameInputModal sessionId={sessionId} />
          </Modal>
        );
      }
    } else {
      // TODO: maybe throw an exception and let React Router show an error page
      return <p>Error Page</p>;
    }
  };

  return (
    <div className={"flex flex-row"}>
      {getAppropriateElement(sessionId, state?.username)}
    </div>
  );
};

export default Room;
