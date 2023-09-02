import React from "react";
import { useLocation, useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import VideoChat from "./VideoChat";

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
        // TODO ask for username and than permit to join
        return <></>;
      }
    } else {
      //TODO maybe throw exception and let React Router to show error page
      return <p>Error Page</p>;
    }
  };

  return (
    <div className={"flex flex-row"}>
      {getAppropriateElement(sessionId, state?.username || "John Doe")}
    </div>
  );
};

export default Room;
