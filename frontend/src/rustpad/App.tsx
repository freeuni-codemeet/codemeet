import { useEffect, useRef, useState } from "react";
import useStorage from "use-local-storage-state";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import languages from "./languages.json";
import Rustpad, { UserInfo } from "./rustpad";
import useHash from "./useHash";
import { useParams } from 'react-router-dom';


function getWsUri(sessionId: string) {
  console.log(window.location.host);
  return (
    (window.location.origin.startsWith("https") ? "wss://" : "ws://") +
     window.location.host +
    `/api/socket/${sessionId}`
  );
}

function generateName() {
  return "Anonymous ";
}

function generateHue() {
  return Math.floor(Math.random() * 360);
}

function App() {
  const [language, setLanguage] = useState("plaintext");
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [users, setUsers] = useState<Record<number, UserInfo>>({});
  const [name, setName] = useStorage("name", generateName);
  const [hue, setHue] = useStorage("hue", generateHue);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [darkMode, setDarkMode] = useStorage("darkMode", () => false);
  const rustpad = useRef<Rustpad>();
  const sessionId = useParams();
  const id = useHash();

  useEffect(() => {
    if (editor?.getModel()) {
      const model = editor.getModel()!;
      model.setValue("");
      model.setEOL(0); // LF
      rustpad.current = new Rustpad({
        uri: getWsUri(id),
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
        onChangeUsers: setUsers,
      });
      return () => {
        rustpad.current?.dispose();
        rustpad.current = undefined;
      };
    }
  }, [id, editor, setUsers]);

  useEffect(() => {
    if (connection === "connected") {
      rustpad.current?.setInfo({ name, hue });
    }
  }, [connection, name, hue]);

  function handleChangeLanguage(language: string) {
    setLanguage(language);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(`${window.location.origin}/#${id}`);
  }

  function handleLoadSample() {
    if (editor?.getModel()) {
      const model = editor.getModel()!;
      model.pushEditOperations(
        editor.getSelections(),
        [
          {
            range: model.getFullModelRange(),
            text: "",
          },
        ],
        () => null
      );
      editor.setPosition({ column: 0, lineNumber: 0 });
      if (language !== "rust") {
        handleChangeLanguage("rust");
      }
    }
  }

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div
      style={{
        flexDirection: "column",
        marginLeft: "auto",
        height: "100%",
        overflow: "hidden",
        backgroundColor: darkMode ? "#1e1e1e" : "white",
        color: darkMode ? "#cbcaca" : "inherit",
      }}
    >
        <div style={{flex: 1, height: "100%", flexDirection: "column", overflow: "hidden"}}>
          <div style={{flex: 1}}>
            <Editor
              theme={darkMode ? "vs-dark" : "vs"}
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

export default App;
