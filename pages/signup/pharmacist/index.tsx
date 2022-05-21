//PHARMACY SELECTION

import React from 'react';
import {
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Link from 'next/link';
import PharmaciesList from '../../../components/PharmaciesList';

const Pharmacist = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pharmacies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Link href="/create-pharmacy">
          <a>Register a New One</a>
        </Link>
        <PharmaciesList/>
      </IonContent>
    </IonPage>
  );
};

export default Pharmacist;
