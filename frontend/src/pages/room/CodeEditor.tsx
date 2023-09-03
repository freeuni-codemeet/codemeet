import { useEffect, useRef, useState } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import languages from "../../rustpad/languages.json";
import Rustpad from "../../rustpad/rustpad";

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
  const [language, setLanguage] = useState("python");
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [hue, setHue] = useState(generateHue());
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const rustpad = useRef<Rustpad>();
  const monaco = useMonaco();

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
    if (editor?.getModel() && sessionId) {
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
        onChangeLanguage: (language) => {
          if (languages.includes(language)) {
            setLanguage(language);
          }
        },
      });
      return () => {
        rustpad.current?.dispose();
        rustpad.current = undefined;
      };
    }
  }, [sessionId, editor]);

  useEffect(() => {
    if (connection === "connected") {
      rustpad.current?.setInfo({ name: username, hue });
    }
  }, [connection, username, hue]);

  return (
    <div className={"flex flex-col ml-auto h-[60vh] overflow-hidden"}>
      <div className={"flex-1 flex-col h-full"}>
        <div className={"flex-1 h-full"}>
          <Editor
            language={language}
            options={{
              automaticLayout: true,
              fontSize: 13,
            }}
            onMount={(editor) => setEditor(editor)}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
