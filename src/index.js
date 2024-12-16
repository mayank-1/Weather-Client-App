import React from "react";
import ReactDOM from "react-dom/client"; // Update import for createRoot
import "./index.css";
import App from "./App";

// Use ReactDOM.createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
