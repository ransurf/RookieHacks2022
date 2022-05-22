import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';
import { collection, getDocs, doc, updateDoc, addDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const PharmaciesList = () => {
  const [pharmacies, setPharmacies] = React.useState([]);
  const pharmaciesCollectionRef = collection(db, 'pharmacies');
  const [user, loading] = useAuthState(auth);
  const getPharmacies = async () => {
    const docs = await getDocs(pharmaciesCollectionRef);
    setPharmacies(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };
  const addUserToPharmacy = async pharmacyId => {
    console.log(pharmacyId);
    console.log(user.uid);
    //set  new pharmacist in collection with id as user.id
    const pharmacistsCollectionRef: any = collection(db, 'pharmacists');
    setDoc(pharmacistsCollectionRef, user.uid, {
      id: user.uid,
      pharmacyId: pharmacyId,
    });
  };
  React.useEffect(() => {
    getPharmacies();
    console.log(user);
  }, []);
  return (
    <IonList>
      {pharmacies && pharmacies.map((pharmacy) => (
          <IonItem
            key={pharmacy.id}
            onClick={() => {
              addUserToPharmacy(pharmacy.id);
            }}
          >
            <IonLabel>{pharmacy.name}</IonLabel>
            <IonLabel>{pharmacy.address}</IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};
export default PharmaciesList;
