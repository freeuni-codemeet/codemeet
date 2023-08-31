import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserVideoComponent from "./UserVideoComponent";
import useVideoChat from "../../hooks/useVideoChat";
import CodeEditor from "./CodeEditor";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
} from "react-icons/bs";

const Room = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { sessionId } = useParams();

  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const usernameRef: React.MutableRefObject<string> = useRef(
    state?.username || `participant${Math.random() * 100 + 1}`
  );

  const {
    mainStreamManager,
    publisher,
    subscribers,
    joinSession,
    leaveSession,
  } = useVideoChat();

  useEffect(() => {
    if (!sessionId) throw Error("session id not found");
    joinSession(sessionId, usernameRef.current, state?.secretToken);
  }, [state, sessionId, joinSession]);

  const handleLeaveSessionClicked = () => {
    leaveSession();
    navigate("/");
  };

  const handleTurnOffVideo = () => {
    const enabled = !videoEnabled;
    publisher?.publishVideo(enabled);
    setVideoEnabled(enabled);
  };

  const handleTurnOffAudio = () => {
    const enabled = !audioEnabled;
    publisher?.publishAudio(enabled);
    setAudioEnabled(enabled);
  };

  return (
    <div className={"flex h-screen"}>
      <div className={"w-1/4"}>
        {sessionId === undefined ? <h1>Not found page</h1> : <></>}

        {/*TODO add skeletons*/}
        {mainStreamManager === undefined ? (
          <h1>loading...</h1>
        ) : (
          <div className={"flex flex-col max-h-full px-2 gap-2"}>
            <div className={"flex flex-row py-4 px-2 gap-3 items-center"}>
              {videoEnabled ? (
                <BsFillCameraVideoFill
                  onClick={handleTurnOffVideo}
                  className={
                    "w-10 h-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"
                  }
                />
              ) : (
                <BsFillCameraVideoOffFill
                  onClick={handleTurnOffVideo}
                  className={
                    "w-10 h-10 p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
                  }
                />
              )}

              {audioEnabled ? (
                <BsMicFill
                  onClick={handleTurnOffAudio}
                  className={
                    "w-10 h-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"
                  }
                />
              ) : (
                <BsMicMuteFill
                  onClick={handleTurnOffAudio}
                  className={
                    "w-10 h-10 p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
                  }
                />
              )}

              <button
                className={
                  "bg-red-700 hover:bg-red-800 px-3 py-2 text leading-5 rounded-xl font-semibold text-white"
                }
                onClick={handleLeaveSessionClicked}
              >
                Leave
              </button>
            </div>

            <div
              className={"flex flex-col max-h-full overflow-y-auto px-2 gap-2"}
            >
              {publisher !== undefined ? (
                <div>
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div key={i}>
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={"w-3/4"}>
        <CodeEditor />
      </div>
    </div>
  );
};

export default Room;
