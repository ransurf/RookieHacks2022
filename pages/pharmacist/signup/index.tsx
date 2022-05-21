//PHARMACY SELECTION

import React from 'react';
import Link from 'next/link';
import PharmaciesList from '../../../components/PharmaciesList';
import {
  IonContent,
  IonPage,
} from '@ionic/react';
import Form from '../../../components/Form';
import { PatientSignUpSchema } from '../../../formSchemas/PatientSignUpSchema';
import { Header } from '../../../components/Header';
import { db, auth } from "../../../firebase-config";
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PharmacistSignUpSchema } from '../../../formSchemas/PharmacistSignUpSchema';
import {
  collection,
  addDoc,
} from "firebase/firestore";

const SignUp = () => {
  const [pharmacy, loading, error] = useAuthState(auth);
  const pharmaciesRef = collection(db, "pharmacies");

  const onSubmit = async (data) => {
    await addDoc(pharmaciesRef, {...data, UID: pharmacy.uid, email: pharmacy.email});
    Router.push("/pharmacy/requests");
  };

  return (
    <IonPage>
      <Header text="Pharmacy Signup" />
      <IonContent>
        <Form fields={PharmacistSignUpSchema} onSubmit={onSubmit}/>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
