import { createContext, useState, useRef } from "react";
import { ExecuteProps } from "../pages/room/Room";
import Rustpad from "../rustpad/rustpad";

export interface ExecuteContextProps {
    stdin: str
    stdout: str
    rustpad: Rustpad
}

export const ExecuteContext = createContext<ExecuteContextProps>({
  stdin: "",
  stdout: "",
  rustpad: undefined,
  setStdin: () => null,
  setStdout: () => null,
});

export const ExecuteContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [stdin, setStdin] = useState<"" | undefined>("");
  const [stdout, setStdout] = useState<"" | undefined>("");
  const rustpad = useRef<Rustpad>();


  const value = {
    stdin,
    stdout,
    rustpad,
    setStdin,
    setStdout,
  };

  return (
    <ExecuteContext.Provider value={value}>
      {children}
    </ExecuteContext.Provider>
  );
};
