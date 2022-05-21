import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {Header} from '../components/Header';
import Tabs from '../components/Tabs';
type Props = {}

const Home = (props: Props) => {

  return (
    <IonPage>
        <Header text="Requests"/>
        <Tabs/>
    </IonPage>
    
  )
}

export default Home