//PHARMACY SELECTION

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PharmaciesList from '../../../components/PharmaciesList';
import { IonLabel, IonSelectOption, IonSelect, IonItem, IonPage, IonContent, IonCardSubtitle, IonListHeader } from '@ionic/react';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import Form from '../../../components/Form';
import { Header } from '../../../components/Header';
import { db, auth } from '../../../firebase-config';
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NewRequestSchema } from '../../../formSchemas/NewRequestSchema';

const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);
  const requestRef = collection(db, 'requests');
  const pharmaRef = collection(db, 'pharmacies');

  const [pharmacies, setPharmacies] = useState([]);
  const [pharmID, setPharmID] = useState('');
  const onChange = (data: any) => {
    console.log(data);
  };

  //read the pharmacies from the database and map them to an array of objects
  useEffect(() => {
    const getPharmacies = async () => {
      const data = await getDocs(pharmaRef);
      setPharmacies(
        data.docs.map(doc => ({
          ...doc.data(),
          place_id: doc.data().pharmacyID,
          name: doc.data().name,
          address: doc.data().address,
        }))
      );
      console.log(pharmacies);
    };
    getPharmacies();
  }, []);

  //add the user to the database with the selected pharmacyID
  const onSubmit = async data => {
    console.log(data);
    console.log('Creating new request');
    addDoc(requestRef, {...data, pharmacyID: pharmID});
    Router.push('/patient/upload');
  };

  return (
    <IonPage>
      <Header text="Create New Request" />
      <IonContent>
          <IonListHeader>Pharmacy</IonListHeader>
        <IonSelect
          value={pharmID}
          placeholder="Choose a pharmacy"
          okText="Okay"
          cancelText="Dismiss"
          onIonChange={e => setPharmID(e.detail.value)}
        >
          {pharmacies.map((pharm, index) => (
            <IonSelectOption className="w-10/12" value={pharm.pharmacyID} key={index}>
              {pharm.name + ' @ ' + pharm.address}
            </IonSelectOption>
          ))}
        </IonSelect>
        <Form fields={NewRequestSchema} onSubmit={onSubmit} />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
