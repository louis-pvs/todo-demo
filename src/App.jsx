import React, { useState } from "react";

import "./index.scss";
import List from "./List";

export default function App() {
  const [state] = useState([{ id: 1, message: "hello" }]); //

  // initialize app
  return (
    <div className="app">
      <h1>To-do App!</h1>
      <List data={state} />
    </div>
  );
}
