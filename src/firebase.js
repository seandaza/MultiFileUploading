import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
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
const storage = fb.storage();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const microsoftProvider =  new firebase.auth.OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
    // Optional "tenant" parameter in case you are using an Azure AD tenant.
    // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
    // or "common" for tenant-independent tokens.
    // The default value is "common".
    tenant: '24b5cc37-4806-4a81-ad8d-3eec4a0343dd'
  });
export default storage;