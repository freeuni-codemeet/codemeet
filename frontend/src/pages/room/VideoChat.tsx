import useVideoChat from "../../hooks/useVideoChat";
import React from "react";
import UserVideoComponent from "./UserVideoComponent";
import Spinner from "../../components/Spinner";

const VideoChat = () => {
  const { mainStreamManager, publisher, subscribers } = useVideoChat();

  return (
    <>
      {mainStreamManager === undefined ? (
        <div
          className={
            "flex flex-1 max-h-full bg-slate-800 rounded-xl min-h-full py-3 gap-3 justify-center items-center"
          }
        >
          <Spinner />
        </div>
      ) : (
        <div
          className={
            "flex flex-col bg-slate-800 rounded-xl min-h-full py-3 gap-3"
          }
        >
          <div
            className={"flex flex-col overflow-y-auto min-h-0 px-3 gap-3"}
          >
            {publisher !== undefined ? (
              <div>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <UserVideoComponent key={i} streamManager={sub} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoChat;
