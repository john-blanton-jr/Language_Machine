import React from "react";
import "./App.css";
import Translate from "./Translate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Translate />} />
      </Routes>
    </Router>
  );
}

export default App;
