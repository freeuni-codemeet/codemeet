import React, { useEffect, useMemo, useRef } from "react";
import { Connection, StreamManager } from "openvidu-browser";
import useVideoChat from "../../hooks/useVideoChat";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
} from "react-icons/bs";

const UserVideoComponent = ({
  streamManager,
}: {
  streamManager: StreamManager;
}) => {
  const { mainStreamManager, session } = useVideoChat();
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && !!videoRef && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  const nicknameTag = useMemo(() => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }, [streamManager.stream.connection.data]);

  const kickOut = (connection: Connection) => {
    if (mainStreamManager?.stream.connection.role === "MODERATOR") {
      session?.forceDisconnect(connection).then(null);
    }
  };

  return (
    <div>
      {mainStreamManager && streamManager ? (
        <div className={"group"}>
          <div
            className={
              "relative rounded-xl border-sky-700 group-hover:border-2"
            }
          >
            <video autoPlay={true} ref={videoRef} className={"rounded-xl"} />
            <div
              className={
                "invisible flex items-center overflow-x-hidden pl-4 rounded-t-xl text-xl absolute top-0 left-0 w-full h-10 group-hover:visible bg-slate-900 opacity-90"
              }
            >
              <p className={"invisible text-xl group-hover:visible"}>
                {nicknameTag}
              </p>
            </div>

            <div
              className={
                "invisible flex items-center justify-between overflow-x-hidden px-4 rounded-b-xl text-xl absolute bottom-0 left-0 w-full h-14 group-hover:visible bg-slate-900 opacity-90"
              }
            >
              <div className={"flex items-center gap-3"}>
                {streamManager.stream.videoActive ? (
                  <BsFillCameraVideoFill
                    className={"w-8 h-8 p-1 bg-gray-800 rounded-full"}
                  />
                ) : (
                  <BsFillCameraVideoOffFill
                    className={"w-8 h-8 p-1 bg-red-700 rounded-full"}
                  />
                )}
                {streamManager.stream.audioActive ? (
                  <BsMicFill
                    className={"w-8 h-8 p-1 bg-gray-800 rounded-full"}
                  />
                ) : (
                  <BsMicMuteFill
                    className={"w-8 h-8 p-1 bg-red-700 rounded-full"}
                  />
                )}
              </div>

              {streamManager !== mainStreamManager ? (
                <button
                  className={
                    "bg-red-700 hover:bg-red-800 px-2 py-1 text-sm leading-5 rounded-lg font-semibold text-white "
                  }
                  onClick={() => kickOut(streamManager.stream.connection)}
                >
                  Kick Out
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserVideoComponent;
