require("normalize.css");

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import firebase from "firebase";

const { NODE_ENV } = process.env;
// Initialize Firebase
const config = require("../firebase.key." + NODE_ENV);

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root")); // rendering the app in to DOM

if (typeof module.hot !== "undefined") {
  module.hot.accept();
}
