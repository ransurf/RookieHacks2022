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
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";

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
  
  //maps stuff=====================================================
  const [marker, setMarker] = React.useState({lat: null, lng: null});
    const [qRes, setQRes] = React.useState(null);
    // initialize the map from the google maps api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        libraries,
    });

    //save the map instance to a variable
    const mapRef = React.useRef<any>();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    // panning coordinate input
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(13);

    }, []);
  //===========================================================
  //add the user to the database with the selected pharmacyID 
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
        }
    
    })
    
  };

  return (
    <IonPage>
      <Header text="Register Pharmacy" />
      <IonContent>
        <Form fields={PharmacyCreateSchema} onSubmit={onSubmit}/>
          {loadError? "Error loading maps" : (
            <div>
              <LocateBtn panTo={panTo}/>
              <IonItem>
              <GoogleMap 
                 mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}>
                <Marker position={{lat: marker.lat, lng: marker.lng}}/>
              </GoogleMap>
            </IonItem>
            <Search panTo={panTo} setMarker={setMarker} setQRes={setQRes}/>
            </div>
          )}
      </IonContent>
    </IonPage>
  );
};

export default Create;

//=============map functions===================================
function LocateBtn ({panTo}) {
  return <IonButton color="primary" onClick={() => {
      navigator.geolocation.getCurrentPosition((position) => {
          panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          });
          center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          };
          console.log(center);
          //place down a marker at the position
          

      }, () => null);
  }}>Center</IonButton>
}

function Search({ panTo, setMarker, setQRes }) {
  //returns variables in an object
  //value is the value of the input
  navigator.geolocation.getCurrentPosition((position) => {
      center.lat= position.coords.latitude,
      center.lng= position.coords.longitude});

  const {ready, 
      value, 
      suggestions: {status, data}, 
      setValue, 
      clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
          location: {lat: () => center.lat, lng: () => center.lng},
          radius: 100 * 1000,
          types: ["pharmacy"],
      },
  });

  return (
  <Combobox onSelect={async (address) => { 
      //clear out the search suggestions
      setValue(address, false);
      clearSuggestions();

      //parse the results and
      try {
          const results = await getGeocode({ address });
          setQRes(results[0]);
          const { lat, lng } = await getLatLng(results[0]);
          setMarker({lat: lat, lng: lng});
          panTo({ lat, lng });


      } catch (error) {
          console.log("Error", error);
      }
  }}>
      <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value);
      }}
      disabled={!ready}
      placeholder="enter an address"
      />
      <ComboboxPopover>
          <ComboboxList>
              {/* @ts-ignore */}
          {status === "OK" && data.map(({id, description}) => (
              <ComboboxOption key={id} value={description} />
          ))}
          </ComboboxList>
      </ComboboxPopover>
  </Combobox>);


}