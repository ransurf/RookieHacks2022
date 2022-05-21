import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSplitPane,
} from '@ionic/react';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Router from 'next/router';
import Menu from '../components/Menu';
import TabSwitcher from '../components/TabSwitcher';
const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    auth.signOut();
    Router.push('/');
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PharmaConnect</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonSplitPane >
        <Menu/> */}
        <IonContent>
          {user ? (
            <div className="flex flex-col justify-center items-center mt-16">
              <img src={user.photoURL} />
              <p>Welcome back {user.displayName} !</p>
              <br />
              <IonButton onClick={logout}> Logout</IonButton>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p>
                You are not currently logged in. Please <a href="/">sign in</a>.
              </p>
            </div>
          )}
          <TabSwitcher />
        </IonContent>
      {/* </IonSplitPane> */}
    </IonPage>
  );
};
export default Home;
