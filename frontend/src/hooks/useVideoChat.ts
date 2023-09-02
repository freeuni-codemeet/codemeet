import React, { useCallback, useContext, useEffect } from "react";
import {
  OpenVidu,
  Publisher,
  Session,
  StreamManager,
  Subscriber,
} from "openvidu-browser";
import openviduApi from "../api/openvidu";
import { VideoChatContext } from "../context/videoChatContext";

interface VideoChatHookProps {
  session: Session | undefined;
  mainStreamManager: StreamManager | undefined;
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
  joinSession: (
    sessionId: string,
    userData: string,
    secretToken?: string
  ) => void;
  leaveSession: () => void;
  setMainStreamManager: React.Dispatch<
    React.SetStateAction<StreamManager | undefined>
  >;
}

const useVideoChat = (): VideoChatHookProps => {
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    session,
    setSession,
  } = useContext(VideoChatContext);

  const navigateToMainPageHard = () => {
    window.location.href = window.location.origin;
  };

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session, setSession, setSubscribers, setMainStreamManager, setPublisher]);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);
    return () => window.removeEventListener("beforeunload", leaveSession);
  }, [leaveSession]);

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((subscribers) =>
      subscribers.filter((subscriber) => subscriber !== streamManager)
    );
  };

  const getToken = async (sessionId: string, secretToken?: string) => {
    await openviduApi.joinSession(sessionId);
    return await openviduApi.createToken(sessionId, secretToken);
  };

  const joinSession = (
    sessionId: string,
    username: string,
    secretToken?: string
  ) => {
    if (session) {
      return; //"already joined"
    }

    const openvidu = new OpenVidu();

    const sessionTmp = openvidu.initSession();

    if (!sessionTmp) {
      throw Error("null session");
    }

    sessionTmp.on("streamCreated", (event) => {
      setSubscribers((currentSubscribers) => [
        ...currentSubscribers,
        sessionTmp.subscribe(event.stream, undefined),
      ]);
    });

    sessionTmp.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    sessionTmp.on("exception", (exception) => {
      console.warn(exception);
    });

    sessionTmp.on("sessionDisconnected", (event) => {
      if (
        event.reason === "forceDisconnectByUser" ||
        event.reason === "forceDisconnectByServer"
      ) {
        setSession(undefined);
        setSubscribers([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        navigateToMainPageHard(); // TODO give clients info that they have been kicked out
      }
    });

    setSession(sessionTmp);

    getToken(sessionId, secretToken).then((token) => {
      sessionTmp
        .connect(token, { clientData: username })
        .then(async () => {
          if (openvidu === null) {
            throw Error("openvidu null");
          }

          const publisher = await openvidu.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: true,
          });

          await sessionTmp.publish(publisher);

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

  return {
    session: session,
    mainStreamManager: mainStreamManager,
    publisher: publisher,
    subscribers: subscribers,
    joinSession: joinSession,
    leaveSession: leaveSession,
    setMainStreamManager: setMainStreamManager,
  };
};

export default useVideoChat;
