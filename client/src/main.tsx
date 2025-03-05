import React from "react";
import ReactDOM from "react-dom/client";

import './styles/index.css';
import Home from "./interfaces/pages/Home";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);