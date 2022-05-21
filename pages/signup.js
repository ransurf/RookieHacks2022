import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import React from 'react'
import { PatientSignUpSchema } from '../formSchemas/PatientSignUpSchema';

import { db } from "../firebase-config";
import {
  collection,
  addDoc,
} from "firebase/firestore";

import Form from '../components/Form';

const SignUp = () => {

  const usersCollectionRef = collection(db, "test");

  const onSubmit = async (data) => {
    await addDoc(usersCollectionRef, data);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign Up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Form fields={PatientSignUpSchema} onSubmit={onSubmit}/>
        </IonContent>

      </IonPage>
  );
};

export default SignUp;