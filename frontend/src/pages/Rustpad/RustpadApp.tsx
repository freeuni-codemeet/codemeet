import React, { useEffect, useRef, useState } from "react";
import useStorage from "use-local-storage-state";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import languages from "./languages.json";
import animals from "./animals.json";
import Rustpad, { UserInfo } from "./rustpad";
import { useParams } from 'react-router-dom';

function getWsUri(id: string) {
  return (
    (window.location.origin.startsWith("https") ? "wss://" : "ws://") +
    window.location.host +
    `/room/${id}`
  );
}

function generateName() {
  return "Anonymous " + animals[Math.floor(Math.random() * animals.length)];
}

function generateHue() {
  return Math.floor(Math.random() * 360);
}

const RustpadApp = () => {
  const [language, setLanguage] = useState("plaintext");
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [users, setUsers] = useState<Record<number, UserInfo>>({});
  const [name, setName] = useStorage("name", generateName);
  const [hue, setHue] = useStorage("hue", generateHue);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const rustpad = useRef<Rustpad>();
  const { sessionId } = useParams();

  useEffect(() => {
    if (editor?.getModel()) {
      const model = editor.getModel()!;
      model.setValue("");
      model.setEOL(0); // LF
      rustpad.current = new Rustpad({
        uri: getWsUri(sessionId || ""),
        editor,
        onConnected: () => setConnection("connected"),
        onDisconnected: () => setConnection("disconnected"),
        onDesynchronized: () => {
          setConnection("desynchronized");
          console.log("Please save your work and refresh the page.");
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
  }, [sessionId, editor, setUsers]);

  useEffect(() => {
    if (connection === "connected") {
      rustpad.current?.setInfo({ name, hue });
    }
  }, [connection, name, hue]);

  useEffect(() => {
    if (editor) {
      const model = editor.getModel();
      if (model) {
        model.setValue("");
        model.setEOL(0); // LF
      }
    }
  }, [editor]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        color: "#cbcaca",
      }}
    >
      <div style={{ flex: 1, minHeight: 0 }}>
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
  );
};

export default RustpadApp;
