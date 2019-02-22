/**
 *  @returns firebase database
 **/
function initializeFirestore() {
  const firebase = require("@firebase/app").default;
  require("@firebase/firestore");
  const { NODE_ENV } = process.env;
  const config = require("../../firebase.key." + NODE_ENV);

  // Initialize Firebase
  firebase.initializeApp(config);
  return firebase;
}

export default initializeFirestore;
