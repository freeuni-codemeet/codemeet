import { createContext, useState, useRef } from "react";
import { ExecuteProps } from "../pages/room/Room";
import Rustpad from "../rustpad/rustpad";

export interface ExecuteContextProps {
    stdin: str
    stdout: str
    rustpad: Rustpad
    output_color: str
    selectedLanguage: str
}

export const ExecuteContext = createContext<ExecuteContextProps>({
  stdin: "",
  stdout: "",
  rustpad: undefined,
  output_color: "",
  selectedLanguage: "",
  setStdin: () => null,
  setStdout: () => null,
  setOutputColor: () => null,
  setSelectedLanguage: () => null,
});

export const ExecuteContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [stdin, setStdin] = useState<str | undefined>("");
  const [stdout, setStdout] = useState<str | undefined>("");
  const [output_color, setOutputColor] = useState<str | undefined>("white");
  const [selectedLanguage, setSelectedLanguage] = useState<str | undefined>("python");
  const rustpad = useRef<Rustpad>();


  const value = {
    stdin,
    stdout,
    rustpad,
    output_color,
    selectedLanguage,
    setStdin,
    setStdout,
    setOutputColor,
    setSelectedLanguage,
  };

  return (
    <ExecuteContext.Provider value={value}>
      {children}
    </ExecuteContext.Provider>
  );
};
