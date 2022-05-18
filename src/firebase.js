import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBF82jFVrUwEZY6z62TonxFxW1d2C51Vtc",
    authDomain: "gc-k-gbl-lab.firebaseapp.com",
    projectId: "gc-k-gbl-lab",
    storageBucket: "gc-k-gbl-lab.appspot.com",
    messagingSenderId: "1084102166906",
    appId: "1:1084102166906:web:33d1c2ae156ca5f613aec3"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore()

export default db;