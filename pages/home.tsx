import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {Header} from '../components/Header';
import TempTabs from '../components/TempTabs';
import Link from 'next/link';
type Props = {}

const Home = (props: Props) => {

  return (
    <IonPage>
        <Link href="/requests/patients">
            <a>Requests</a>
        </Link>
        <TempTabs/>
    </IonPage>
  )
}

export default Home