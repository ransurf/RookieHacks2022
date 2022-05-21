import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import Link from 'next/link';
import Router from 'next/router';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './Menu';

import { auth } from '../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";


import Tabs from './examplePages/Tabs';
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
        user? Router.push('/home') : Router.push('/start');
    }
  });

  return (
    <IonApp>
      <IonSplitPane contentId="main">
        <IonRouterOutlet id="main">
          <Link href="/start">
            <a>Start</a>
          </Link>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
};

export default AppShell;
