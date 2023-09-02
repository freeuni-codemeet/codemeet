import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import VideoChat from "./VideoChat";
import Modal from "../../components/Modal";
import UsernameInputModal from "./UsernameInputModal";

const Room = () => {
  const { state } = useLocation();
  const { sessionId } = useParams();

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
              <CodeEditor sessionId={sessionId} username={username} />
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
      //TODO maybe throw exception and let React Router to show error page
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
