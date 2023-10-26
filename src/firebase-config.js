// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDwthIUrlRgTAt3giKJ37CUEOyRCfwJ3M",
  authDomain: "react-auth-project-7bc29.firebaseapp.com",
  projectId: "react-auth-project-7bc29",
  storageBucket: "react-auth-project-7bc29.appspot.com",
  messagingSenderId: "286530120024",
  appId: "1:286530120024:web:112a5a21c2ab883b6f9d2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;

        sessionStorage.setItem("brugernavn", name);
        sessionStorage.setItem("email", email);
    }).catch((error) => {
        alert("Du er ikke logget på: "+error)
    })
}