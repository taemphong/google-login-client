import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDFTvgYdwTSbCstFZVZFFz2ZRV7J4qH-lY",
    authDomain: "loginmern-1b154.firebaseapp.com",
    projectId: "loginmern-1b154",
    storageBucket: "loginmern-1b154.firebasestorage.app",
    messagingSenderId: "446827407488",
    appId: "1:446827407488:web:f1fcd78fd79d604d421e65",
    measurementId: "G-5TB5V05XKL"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();