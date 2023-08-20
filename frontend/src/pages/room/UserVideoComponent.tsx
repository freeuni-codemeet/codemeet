import React, { useEffect, useMemo, useRef } from "react";
import { StreamManager } from "openvidu-browser";

const UserVideoComponent = ({
  streamManager,
}: {
  streamManager: StreamManager;
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && !!videoRef && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  const nicknameTag = useMemo(() => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }, [streamManager.stream.connection.data]);

  return (
    <div>
      {streamManager !== undefined ? (
        <div className={"relative group"}>
          <video
            autoPlay={true}
            ref={videoRef}
            className={"rounded-xl border-sky-700 group-hover:border-2"}
          />
          <div
            className={
              "invisible flex items-center overflow-x-hidden pl-4 text-xl absolute top-0 left-0 w-full h-10 group-hover:visible bg-slate-900 opacity-90"
            }
          >
            <p className={"invisible text-xl group-hover:visible"}>
              {nicknameTag}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserVideoComponent;
