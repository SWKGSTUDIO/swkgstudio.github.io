// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkqcs5Y-PBT0ar28KUysYIlwcCzoAOFao",
  authDomain: "swkg-595fe.firebaseapp.com",
  projectId: "swkg-595fe",
  storageBucket: "swkg-595fe.appspot.com",
  messagingSenderId: "991144151960",
  appId: "1:991144151960:web:95f0dd7861af2d9f4b39ed",
  measurementId: "G-Z1KC8WW6Y3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
