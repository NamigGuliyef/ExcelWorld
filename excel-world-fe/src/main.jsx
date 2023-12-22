import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import Snackbar from "./Context/Snackbar.jsx";
import ScrollToTop from "./components/ScrollToTop";

import "./sass/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-quill/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Snackbar>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Snackbar>
    </BrowserRouter>
  </React.StrictMode>
);
