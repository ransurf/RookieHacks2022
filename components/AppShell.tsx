import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react';
import Router from 'next/router';
import { auth, db } from '../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Header } from './Header';
import Link from 'next/link';

const provider = new GoogleAuthProvider();
const AppShell = () => {
  //const [user, loading, error] = useAuthState(auth);
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log('login successfull');
        //return the user from login
        const user = result.user;
        console.log(user);
        //search database for user
        const userRef = collection(db, 'users');
        const q = query(userRef, where('UID', '==', user.uid));
        getDocs(q)
          .then(docs => {
            console.log(docs);
            //user not in database
            if (docs.empty === true) {
              alert('You are not registered yet. Please sign up.');
              Router.push('/start');
            } else {
              Router.push('/patient/requests');
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <IonApp>
      <IonSplitPane contentId="main">
        <IonRouterOutlet id="main">
          <IonContent>
            <Header />
            <h1>Welcome to PharmaConnect</h1>
            <IonButton expand="block" size="large" onClick={handleLogin}>
              <IonIcon slot="start" name="logo-google" />
              Sign Into Google
            </IonButton>
            <Link href="/pharmacist/requests">
              <a>RequestsTest</a>
            </Link>
          </IonContent>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
};
export default AppShell;
