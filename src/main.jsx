import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { ContactsProvider } from "./context/ContactsProvider";

import "font-awesome/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContactsProvider>
        <App />
      </ContactsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
