import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBF48g22jZevys2ZV110JDjNGNPGpL75No",
  authDomain: "ready-steady-cocktail.firebaseapp.com",
  databaseURL: "https://ready-steady-cocktail.firebaseio.com",
  storageBucket: "ready-steady-cocktail.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
