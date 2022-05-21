import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonButton,
  IonIcon,
  IonContent,
  IonPage,
} from '@ionic/react';

import Router from 'next/router';

import { auth, db } from '../firebase-config';

import { Header } from './Header';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, query, where, getDocs, } from 'firebase/firestore';

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch { }
});

const provider = new GoogleAuthProvider();

const AppShell = () => {
  //const [user, loading, error] = useAuthState(auth);


  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("login successfull");
      //return the user from login
      const user = result.user;
      console.log(user);

      //search database for user
      const userRef = collection(db, 'users');
      const q = query(userRef, where('UID', '==', user.uid));
      getDocs(q).then((docs) => {
        console.log(docs);
        //user not in database
        if (docs.empty === true) {
          alert("You are not registered yet. Please sign up.");
          Router.push('/start');
        }
        else {
          Router.push("/home");
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  return (<IonApp>
    <IonSplitPane contentId="main">
      <IonRouterOutlet id="main">
        <IonContent>
          <Header />
          <h1>Welcome to PharmaConnect</h1>
          <IonButton expand="block" size='large' onClick={handleLogin}>
            <IonIcon slot="start" name="logo-google" />
            Sign in/Sign up to your account with google
          </IonButton>
        </IonContent>
      </IonRouterOutlet>
    </IonSplitPane>
  </IonApp>
  );
};

export default AppShell;
