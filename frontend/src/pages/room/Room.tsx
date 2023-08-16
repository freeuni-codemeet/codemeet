import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserVideoComponent from "./UserVideoComponent";
import useVideoChat from "../../hooks/useVideoChat";
import CodeEditor from "./CodeEditor";

const Room = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { sessionId } = useParams();

  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const usernameRef: React.MutableRefObject<string> = useRef(
    state?.username || `participant${Math.random() * 100 + 1}`
  );

  const [mainStreamManager, publisher, subscribers, joinSession, leaveSession] =
    useVideoChat();

  useEffect(() => {
    if (sessionId === undefined) throw Error("session id not found");
    joinSession(sessionId, usernameRef.current);
  }, []);

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
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 50%" }}>
        {sessionId === undefined ? <h1>Not found page</h1> : <></>}

        {mainStreamManager === undefined ? (
          <h1>loading...</h1>
        ) : (
          <div>
            <div>
              <h1>{sessionId}</h1>
              <input
                type="checkbox"
                id="checkBoxVideo"
                onChange={handleTurnOffVideo}
                checked={videoEnabled}
              />
              <label htmlFor="checkBoxVideo">video switch</label>
              <input
                type={"checkbox"}
                id="checkBoxAudio"
                onChange={handleTurnOffAudio}
                checked={audioEnabled}
              />
              <label htmlFor="checkBoxAudio">audio switch</label>
              <input
                type={"button"}
                onClick={handleLeaveSessionClicked}
                value="Leave session"
              />
            </div>

            <div>
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
      <div style={{ flex: "0 0 50%" }}>
        <CodeEditor />
      </div>
    </div>
  );
};

export default Room;
