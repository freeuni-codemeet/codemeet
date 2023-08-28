import React, { useEffect, useRef, useState } from "react";
import {
  OpenVidu,
  Publisher,
  Session,
  StreamManager,
  Subscriber,
} from "openvidu-browser";
import openviduApi from "../api/openvidu";

const useVideoChat = (): [
  StreamManager | undefined,
  Publisher | undefined,
  Subscriber[],
  (arg1: string, arg2: string) => void,
  () => void,
  React.Dispatch<React.SetStateAction<StreamManager | undefined>>
] => {
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const sessionRef = useRef<Session | null>(null);
  const onBeforeUnload = () => leaveSession();

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [onBeforeUnload]);

  const deleteSubscriber = (streamManager: StreamManager) =>
    setSubscribers((subscribers) =>
      subscribers.filter((subscriber) => subscriber !== streamManager)
    );

  const getToken = async (sessionId: string) => {
    await openviduApi.joinSession(sessionId);
    return await openviduApi.createToken(sessionId);
  };

  const joinSession = (sessionId: string, username: string) => {
    if (sessionRef.current !== null) {
      return; //"already joined"
    }

    const openvidu = new OpenVidu();

    sessionRef.current = openvidu.initSession();

    if (!sessionRef.current) {
      throw Error("null session");
    }

    sessionRef.current.on("streamCreated", (event) => {
      setSubscribers((currentSubscribers) => [
        ...currentSubscribers,
        sessionRef.current.subscribe(event.stream, undefined),
      ]);
    });

    sessionRef.current.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    sessionRef.current.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken(sessionId).then((token) => {
      sessionRef.current
        .connect(token, { clientData: username })
        .then(async () => {
          if (openvidu === null) {
            throw Error("openvidu null");
          }

          const publisher = await openvidu.initPublisherAsync(
            undefined,
            {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: "640x480",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: true,
            }
          );

          await sessionRef.current.publish(publisher);

          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    if (sessionRef.current) {
      sessionRef.current?.disconnect();
    }
    sessionRef.current = null;
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  return [
    mainStreamManager,
    publisher,
    subscribers,
    joinSession,
    leaveSession,
    setMainStreamManager,
  ];
};

export default useVideoChat;
