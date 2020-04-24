import React from "react";
import { Switch, Route } from "react-router-dom";
import { Gallery } from "./components/Gallery";
import { Filters } from "./components/Filters";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-title">
        <h1>My Photo Gallery</h1>
      </header>

      <Switch>
        <Route path="/">
          <Gallery />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
