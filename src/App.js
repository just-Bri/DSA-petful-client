import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Adopt from "./components/Adopt";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/adopt">
          <Adopt />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
