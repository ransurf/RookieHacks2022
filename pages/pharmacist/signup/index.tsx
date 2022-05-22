//PHARMACY SELECTION

import React from 'react';
import Link from 'next/link';
import PharmaciesList from '../../../components/PharmaciesList';
import {
  IonContent,
  IonPage,
} from '@ionic/react';
import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";

import Form from '../../../components/Form';
import { PatientSignUpSchema } from '../../../formSchemas/PatientSignUpSchema';
import { Header } from '../../../components/Header';
import { db, auth } from "../../../firebase-config";
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PharmacistSignUpSchema } from '../../../formSchemas/PharmacistSignUpSchema';


const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);
  const userRef = collection(db, "users");

  const q = query(userRef, where('UID', '==', user.uid));
  const onSubmit = async (data) => {
    console.log(data);
    console.log("inserting new user as pharmacist");
    addDoc(userRef, {
      firstName: data.firstName, 
      lastName: data.lastName,
      email: data.contact_email,
      phoneNumber: data.phoneNumber,
      UID: user.uid,
      pharmacyID: null, 
      role: ["pharmacist"]
    });
    Router.push('/pharmacist/requests');
  };

  return (
    <IonPage>
      <Header text="Pharmacist Signup" />
      <IonContent>
        <Form fields={PharmacistSignUpSchema} onSubmit={onSubmit}/>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
