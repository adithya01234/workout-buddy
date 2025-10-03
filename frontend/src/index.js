import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './App.css';
import reportWebVitals from "./reportWebVitals";
import { WorkoutsContextprovider } from "./context/WorkoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WorkoutsContextprovider>
      <App />
    </WorkoutsContextprovider>
  </React.StrictMode>
);
