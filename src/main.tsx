import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
