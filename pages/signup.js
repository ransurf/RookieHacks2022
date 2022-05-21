import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  collection,
  addDoc,
} from "firebase/firestore";
import React from 'react'
import Router from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";

import { PatientSignUpSchema } from '../formSchemas/PatientSignUpSchema';
import { db, auth } from "../firebase-config";
import Form from '../components/Form';

const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);

  const usersRef = collection(db, "users");

  const onSubmit = async (data) => {
    await addDoc(usersRef, {...data, UID: user.uid, email: user.email});
    Router.push("/home");
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