import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAphKLd6dIPAU3JdzsBumFiyLLOTRVW2YI",
    authDomain: "catch-of-the-day-kanika.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-kanika.firebaseio.com",
  });

const base = Rebase.createClass(firebaseApp.database());


// this is a named export
export {firebaseApp};

//default export
export default base;
