require("normalize.css");

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root")); // rendering the app in to DOM

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}
