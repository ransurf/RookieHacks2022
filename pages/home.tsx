import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  Button
} from "@ionic/react";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Router from "next/router";
const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    auth.signOut();
    Router.push("/");
  };
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>PharmaConnect</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {user ? (
            <div className="flex justify-center items-center">
              <img src={user.photoURL} />
              <p1>Welcome back {user.displayName} !</p1>
              <br />
              <button onClick={logout}> ||Logout||</button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p1>
                You are not currently logged in. Please <a href="/">sign in</a>.
              </p1>
            </div>
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default Home;
