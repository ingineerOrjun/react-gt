import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // ✅ Ensure correct import path
import "./index.css"; // ✅ If you have global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
  
    <App />
  </Router>
);
