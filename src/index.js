if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}
require("normalize.css");

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root")); // rendering the app in to DOM

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}
