import { IonApp, 
  IonRouterOutlet, 
  IonSplitPane, 
  IonButton, 
  IonIcon,
  IonContent, } from '@ionic/react';

import Link from 'next/link';
import Router from 'next/router';

import { auth, signUpWithGoogle, signInWithGoogle, db } from '../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";

import {useEffect} from 'react';

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});



const AppShell = () => {
  const [user, loading, error] = useAuthState(auth);

  // idk wtf pathname is supposed to be
  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/' ){
        Router.push('/start');
    }
  });

  return (
    <IonApp>
      <IonSplitPane contentId="main">
        <IonRouterOutlet id="main">
          <IonContent>
            <h1 class="text-5xl font-BrushScriptMT">PharmaConnect</h1>
            <IonButton expand="block" size='large' onClick={signUpWithGoogle}>
              <IonIcon slot="start" name="logo-google" />
              Sign Up with Google
            </IonButton>
            <IonButton expand="block" size='large' onClick={signInWithGoogle}>
              <IonIcon slot="start" name="logo-google" />
              Login with Google
            </IonButton>
          </IonContent>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
};

export default AppShell;
