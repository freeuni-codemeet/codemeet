import React from 'react';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import init, { set_panic_hook } from "rustpad-wasm";
import {BrowserRouter} from "react-router-dom";
import App from "./App";


init().then(() => {
  set_panic_hook();
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
  root.render(
      <BrowserRouter>
        <App/>
    </BrowserRouter>
  );
});