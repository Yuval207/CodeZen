import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Problems from "./components/Problems.jsx";
import EditorPage from "./components/Editor/EditorPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
