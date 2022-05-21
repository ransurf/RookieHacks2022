import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, addDoc,} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Result } from 'postcss';
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =  initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// for testing ========================================================
export const signUpWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log("login successfull");
    const user = result.user;
    console.log(user);

    const userRef = collection(db, 'users');
    const q = query(userRef, where('UID', '==', user.uid));
    getDocs(q).then((docs) => {
      console.log(docs);
      if (docs.empty === true) {
        addDoc(userRef, { name: user.displayName, email: user.email, UID: user.uid });
      }
    }).catch((err) => {
      console.log(err);
    });
  }).catch((error) => {
    console.log(error);
  });
};


export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log("login successfull");
    const user = result.user;
    console.log(user);

    const userRef = collection(db, 'users');
    const q = query(userRef, where('UID', '==', user.uid));
    getDocs(q).then((docs) => {
      console.log(docs);
      if (docs.empty === true) {
        alert("You are not registered yet. Please sign up.");
        auth.signOut();
      }
    }).catch((err) => {
      console.log(err);
    });
  }).catch((error) => {
    console.log(error);
  });
};



  
