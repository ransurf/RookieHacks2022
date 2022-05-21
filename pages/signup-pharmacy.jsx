//PHARMACY SELECTION

import React from 'react';
import {
  IonContent,
  IonPage,
} from '@ionic/react';
import Form from '../components/Form';
import { PatientSignUpSchema } from '../formSchemas/PatientSignUpSchema';
import { Header } from '../components/Header';
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
} from "firebase/firestore";

const Pharmacies = () => {

  const usersRef = collection(db, "pharmacies");

  const onSubmit = async (data) => {
    await addDoc(usersRef, {...data, UID: user.uid, email: user.email});
    Router.push("/home");
  };

  return (
    <IonPage>
      <Header text="Pharmacy Signup" />
      <IonContent>
        <Form fields={PatientSignUpSchema} onSubmit={onSubmit}/>
      </IonContent>
      
    </IonPage>
  );
};

export default Pharmacies;
