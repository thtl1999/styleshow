var firebase = require("firebase");

var FBconfig = firebase.initializeApp({
    apiKey: "AIzaSyBU2Mghux1yATbyRAXbw8qVnSBkdEiyDqg",
    authDomain: "styleshow-login.firebaseapp.com",
    databaseURL: "https://styleshow-login.firebaseio.com",
    projectId: "styleshow-login",
    storageBucket: "styleshow-login.appspot.com",
    messagingSenderId: "332877089687"
});

module.exports = FBconfig;