import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "./context/TaskContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <TaskProvider>
      <ToastContainer />
      <App />
    </TaskProvider>
  </Router>
);
