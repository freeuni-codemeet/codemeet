import React, {createContext, useState, useRef, PropsWithChildren} from "react";
import Rustpad from "../rustpad/rustpad";

export interface ExecuteContextProps {
    stdin: string
    stdout: string
    rustpad: React.MutableRefObject<Rustpad | undefined> | undefined
    outputColor: string
    selectedLanguage: string
    isLoading: boolean
    setStdin: React.Dispatch<React.SetStateAction<string>>;
    setStdout: React.Dispatch<React.SetStateAction<string>>;
    setOutputColor: React.Dispatch<React.SetStateAction<string>>;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExecuteContext = createContext<ExecuteContextProps>({
  stdin: "",
  stdout: "",
  rustpad: undefined,
  outputColor: "",
  selectedLanguage: "",
  isLoading: false,
  setStdin: () => null,
  setStdout: () => null,
  setOutputColor: () => null,
  setSelectedLanguage: () => null,
  setIsLoading: () => null,
});

export const ExecuteContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [stdin, setStdin] = useState<string>("");
  const [stdout, setStdout] = useState<string>("");
  const [outputColor, setOutputColor] = useState<string>("white");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("python");
  const rustpad = useRef<Rustpad>();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const value = {
    stdin: stdin,
    stdout: stdout,
    rustpad: rustpad,
    outputColor: outputColor,
    selectedLanguage: selectedLanguage,
    isLoading: isLoading,
    setStdin: setStdin,
    setStdout: setStdout,
    setOutputColor: setOutputColor,
    setSelectedLanguage: setSelectedLanguage,
    setIsLoading: setIsLoading,
  };

  return (
    <ExecuteContext.Provider value={value}>
      {children}
    </ExecuteContext.Provider>
  );
};
