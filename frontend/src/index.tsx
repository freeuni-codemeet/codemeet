import React from "react";
import ReactDOM from "react-dom/client";
import init, { set_panic_hook } from "rustpad-wasm";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

init().then(() => {
  set_panic_hook();
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
