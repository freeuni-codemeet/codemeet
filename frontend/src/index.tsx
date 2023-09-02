import React from "react";
import ReactDOM from "react-dom/client";
import init, { set_panic_hook } from "rustpad-wasm";
import App from "./App";
import "./index.css";

init().then(() => {
  set_panic_hook();
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(<App />);
});
