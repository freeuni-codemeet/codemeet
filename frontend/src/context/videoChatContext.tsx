import React, { createContext, PropsWithChildren, useState } from "react";
import {
  Publisher,
  Session,
  StreamManager,
  StreamPropertyChangedEvent,
  Subscriber,
} from "openvidu-browser";

interface VideoChatContextProps {
  streamPropertyChangeEvent: StreamPropertyChangedEvent | undefined;
  setStreamPropertyChangeEvent: React.Dispatch<
    React.SetStateAction<StreamPropertyChangedEvent | undefined>
  >;
  mainStreamManager: StreamManager | undefined;
  setMainStreamManager: React.Dispatch<
    React.SetStateAction<StreamManager | undefined>
  >;
  publisher: Publisher | undefined;
  setPublisher: React.Dispatch<React.SetStateAction<Publisher | undefined>>;
  subscribers: Subscriber[];
  setSubscribers: React.Dispatch<React.SetStateAction<Subscriber[]>>;
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
}

export const VideoChatContext = createContext<VideoChatContextProps>({
  streamPropertyChangeEvent: undefined,
  setStreamPropertyChangeEvent: () => null,
  mainStreamManager: undefined,
  setMainStreamManager: () => null,
  publisher: undefined,
  setPublisher: () => null,
  subscribers: [],
  setSubscribers: () => null,
  session: undefined,
  setSession: () => null,
});

export const VideoChatContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [streamPropertyChangeEvent, setStreamPropertyChangeEvent] = useState<
    StreamPropertyChangedEvent | undefined
  >(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [session, setSession] = useState<Session | undefined>();

  const value = {
    streamPropertyChangeEvent,
    setStreamPropertyChangeEvent,
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    session,
    setSession,
  };

  return (
    <VideoChatContext.Provider value={value}>
      {children}
    </VideoChatContext.Provider>
  );
};
