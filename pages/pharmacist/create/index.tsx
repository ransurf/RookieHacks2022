//PHARMACY SELECTION

import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  IonItem,
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/react';

import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Map from '../../map';
import Form from '../../../components/Form';
import { PharmacyCreateSchema } from '../../../formSchemas/PharmacyCreateSchema';
import { Header } from '../../../components/Header';
import { db, auth } from "../../../firebase-config";
import mapStyles from '../../../public/maptest/mapStyles';
//===========================================================
const mapContainerStyle = {
  width: '90vw',
  height: '25vh',
};    
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries: any = ["places"];

var center = {
  lat: 56.1304,
  lng: -106.3468
};
//=================rendered stuff==============================
const Create = () => {
  const [user, loading, error] = useAuthState(auth);
  const userRef = collection(db, "users");
  const [pharmacies, setPharmacies] = useState([]);
  
    const [qRes, setQRes] = React.useState(null);

    const handleSel = (qRes) => { setQRes(qRes); };

  const onSubmit = async (data) => {
    console.log(data);
    console.log(qRes);
    console.log("registering new pharmacy");
    const pharmRef = collection(db, "pharmacies");
    const q = query(pharmRef, where("pharmacyID", "==", 1));
    getDocs(q)
        .then(docs => {
        console.log(docs);
        if (docs.empty === true) {
            addDoc(pharmRef, {
                name: data.name, 
                phoneNumber: data.phoneNumber,
                email: data.contact_email,
                desc: data.description,
                pharmacyID: qRes.place_id, 
                address: qRes.formatted_address,
            });
            Router.push("/");
        }
    
    })
    
  };

  return (
    <IonPage>
      <Header text="Register Pharmacy" />
      <IonContent>
        <Form fields={PharmacyCreateSchema} onSubmit={onSubmit}/>
        <Map handleSel={handleSel}/>
      </IonContent>
    </IonPage>
  );
};

export default Create;