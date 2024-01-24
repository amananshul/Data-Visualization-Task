import React from "react";
import "./App.css";
import WineStats from "./components/WineStats";
// Import the JSON file
import wineData from "../src/data/wineData.json";
function App() {
  return (
    <div className="App">
      <div className="parentBox">
      <h2> Data-Visualization-Task</h2>
      <h4>Below you can view both the tables</h4>
      </div>
      <WineStats wineData={wineData} />
    </div>
  );
}

export default App;
