import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import languages from "../../rustpad/languages.json";
import { useParams } from 'react-router-dom';
import Rustpad from "../../rustpad/rustpad";


const getWsUri = (sessionId: string)  => {
  return (
    (window.location.origin.startsWith("https") ? "wss://" : "ws://") +
     window.location.host +
    `/rustpad-api/socket/${sessionId}`
  );
}

const generateName = () => {
  return "Anonymous" + Math.floor(Math.random() * 360);
}

const generateHue = () => {
  return Math.floor(Math.random() * 360);
}

const CodeEditor = () => {
  const [language, setLanguage] = useState("plaintext");
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [name, setName] = useState(generateName());
  const [hue, setHue] = useState(generateHue());
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const rustpad = useRef<Rustpad>();
  const {sessionId} = useParams();

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
      rustpad.current?.setInfo({ name, hue });
    }
  }, [connection, name, hue]);


  return (
    <div
      style={{
        flexDirection: "column",
        marginLeft: "auto",
        height: "100vh",
        overflow: "hidden",
      }}
    >
        <div style={{flex: 1, height: "100%", flexDirection: "column", overflow: "hidden"}}>
          <div style={{flex: 1, height: "100%"}}>
            <Editor
              theme={"vs-dark"}
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
}

export default CodeEditor;
