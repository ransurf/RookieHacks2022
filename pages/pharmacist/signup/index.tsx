//PHARMACY SELECTION

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PharmaciesList from '../../../components/PharmaciesList';
import {
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonItem,
  IonPage,
  IonContent,
} from '@ionic/react';
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import Form from '../../../components/Form';
import { Header } from '../../../components/Header';
import { db, auth } from "../../../firebase-config";
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PharmacistSignUpSchema } from '../../../formSchemas/PharmacistSignUpSchema';

const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);
  const userRef = collection(db, "users");
  const pharmaRef = collection(db, "pharmacies");

  const [pharmacies, setPharmacies] = useState([]);
  const [pharmID, setPharmID] = useState('');
  const onChange = (data: any) => {
    console.log(data);
  };

  //read the pharmacies from the database and map them to an array of objects
  useEffect(() => {
    const getPharmacies = async () => {
      const data = await getDocs(pharmaRef);
      setPharmacies(data.docs.map(doc => (
          { ...doc.data(),
            place_id: doc.data().pharmacyID,
            name: doc.data().name,
            address: doc.data().address, }
        )));
      console.log(pharmacies);
    };
    getPharmacies();
  }, []);

  //add the user to the database with the selected pharmacyID 
  const onSubmit = async (data) => {
    console.log(data);
    console.log("inserting new user as pharmacist");
    addDoc(userRef, {
      firstName: data.firstName, 
      lastName: data.lastName,
      email: data.contact_email,
      phoneNumber: data.phoneNumber,
      UID: user.uid,
      pharmacyID: pharmID, 
      role: ["pharmacist"]
    });
    Router.push('/pharmacist/requests');
  };

  return (
    <IonPage>
      <Header text="Pharmacist Signup" />
      <IonContent>
        <Form fields={PharmacistSignUpSchema} onSubmit={onSubmit}/>
        <IonItem>
            <IonLabel>Pharmacy</IonLabel>
            <IonSelect value={pharmID} placeholder="Choose your Location" okText="Okay" cancelText="Dismiss" onIonChange={e => setPharmID(e.detail.value)}>
              {pharmacies.map((pharm, index) => (
                <IonSelectOption value={pharm.pharmacyID} key={index}>
                  {pharm.name + " @ " + pharm.address}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
