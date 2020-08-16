import firebase from 'firebase/app';
var firebaseConfig = {
  apiKey: "your apiKey",
  authDomain: "your authDomain",
  databaseURL: "your databaseURL",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId"
  // https://firebase.google.com/docs/web/setup
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;