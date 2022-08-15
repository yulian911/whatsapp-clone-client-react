import { initializeApp } from "firebase/app";
import {  initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey:process.env.REACT_APP_APIKEY ,
    authDomain:process.env.REACT_APP_AUTH ,
    projectId:process.env.REACT_APP_PROJECT_ID ,
    storageBucket:process.env.REACT_APP_STORAGE ,
    appId:process.env.REACT_APP_Id
  };

  // Initialize Firebase
const app =initializeApp(firebaseConfig);

//init services
const db = initializeFirestore(app, {
  useFetchStreams:false,
});

const auth = getAuth(app);
//timestamp firebase

const storage = getStorage(app);

export { db, auth, storage };