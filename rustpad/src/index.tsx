import { StrictMode } from "react";
import ReactDOM from "react-dom";
import init, { set_panic_hook } from "rustpad-wasm";
import App from "./App";
import "./index.css";

init().then(() => {
  set_panic_hook();
  ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
  );
});
