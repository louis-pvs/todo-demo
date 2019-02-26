import firebase from "@firebase/app";
require("@firebase/firestore");

const { NODE_ENV } = process.env;
const config = require("../../firebase.key." + NODE_ENV);

let registedFirebase = null;

function initializeFirebase() {
  if (registedFirebase) {
    return registedFirebase;
  } else {
    registedFirebase = firebase.initializeApp(config); // Initialize Firebase
    return registedFirebase;
  }
}

export default initializeFirebase;
