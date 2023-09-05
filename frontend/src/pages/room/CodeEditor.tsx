import { useEffect, useState, useContext } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import Rustpad from "../../rustpad/rustpad";
import { ExecuteContext } from "../../context/RoomContext";

interface CodeEditorProps {
  sessionId: string;
  username: string;
}

const getWsUri = (sessionId: string) => {
  return (
    (window.location.origin.startsWith("https") ? "wss://" : "ws://") +
    window.location.host +
    `/rustpad-api/socket/${sessionId}`
  );
};

const generateHue = () => {
  return Math.floor(Math.random() * 360);
};

const CodeEditor = ({ sessionId, username }: CodeEditorProps) => {
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [hue, setHue] = useState(generateHue());
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const monaco = useMonaco();

  const { rustpad, selectedLanguage, setSelectedLanguage } =
    useContext(ExecuteContext);

  useEffect(() => {
    monaco?.editor.defineTheme("my-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e293b", //slate-800
      },
    });
    monaco?.editor.setTheme("my-theme");
  }, [sessionId, monaco]);

  useEffect(() => {
    if (rustpad && editor?.getModel() && sessionId) {
      const model = editor.getModel()!;
      model.setValue("");
      model.setEOL(0); // LF
      rustpad.current = new Rustpad({
        uri: getWsUri(sessionId),
        editor,
        onConnected: () => setConnection("connected"),
        onDisconnected: () => setConnection("disconnected"),
        onDesynchronized: () => {
          setConnection("desynchronized");
        },
        onChangeLanguage: (selectedLanguage) => {
          setSelectedLanguage(selectedLanguage);
        },
      });
      return () => {
        if (rustpad) {
          rustpad.current?.dispose();
          rustpad.current = undefined;
        }
      };
    }
  }, [sessionId, editor]);

  useEffect(() => {
    if (connection === "connected") {
      rustpad?.current?.setInfo({ name: username, hue });
    }
  }, [connection, username, hue]);

  return (
    <Editor
      language={selectedLanguage}
      options={{
        automaticLayout: true,
        fontSize: 13,
      }}
      onMount={(editor) => setEditor(editor)}
    />
  );
};

export default CodeEditor;
