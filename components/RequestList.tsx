import React, {useState, useEffect} from 'react';
import { IonList, IonContent, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/react';
import { auth, db } from '../firebase-config';
import { collection,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  doc} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
  requests: Array<Object>;

  onChange: (data: any) => void;
}

const PharmaciesList: React.FC<Props> = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const [role, setRole] = React.useState('');


  const usersRef = collection(db, 'users');
  const twilloRef = collection(db, 'messages');

  useEffect(() => {
    const q = query(usersRef, where('UID', '==', user.uid));
    getDocs(q).then(docs => {
      console.log(docs.docs[0].data().role[0]);
      if (docs.docs[0].data().role[0] === 'pharmacist') {
        setRole('pharmacist');
      } else {
        setRole('patient');
      }
    });
  }, []);

  const { requests, onChange } = props;

  const deleteReq = async (id) => {
    const userDoc = doc(db, "requests", id);
    await deleteDoc(userDoc);
  };
    
  const markReady = async (id,uid) => {
    const userDoc = doc(db, "requests", id);
    const newFields = { status: "ready" };
    await updateDoc(userDoc, newFields);
    const q = query(usersRef, where('UID', '==', uid));
    getDocs(q).then(docs => {
      //console.log(docs.docs[0].data().phoneNumber);
      console.log(id);
      addDoc(twilloRef, {
         to: docs.docs[0].data().phoneNumber,
         body: `Pharmaconnect,\n
               Your prescription request with ID: ${id} is ready to be picked up \n
               
               please check your app for more details.`});
    })
  };
  const markCancel = async (id,uid) => {
    const userDoc = doc(db, "requests", id);
    const newFields = { status: "canceled" };
    await updateDoc(userDoc, newFields);

    const q = query(usersRef, where('UID', '==', uid));
    getDocs(q).then(docs => {
      //console.log(docs.docs[0].data().phoneNumber);
      console.log(id);
      addDoc(twilloRef, {
         to: docs.docs[0].data().phoneNumber,
         body: `Pharmaconnect,\n
               Your prescription request with ID: ${id} has been canceled by the pharmacy \n `});
    })
  };

  return (
    <IonContent onChange={onChange}>
      {requests && requests.map((request: any, index) => (
            <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>Status: {request.status}</IonCardTitle>
              <IonCardSubtitle>patientID: {request.patient}</IonCardSubtitle>
              <IonCardSubtitle>requestID: {request.id}</IonCardSubtitle>
              <IonCardSubtitle>prescribed by: {request.doctor} from {request.clinic}</IonCardSubtitle>
              {role === 'pharmacist'? null :(
                <>
                <IonCardSubtitle>pharmacy: {request.pharmacyName}</IonCardSubtitle>
                <IonCardSubtitle>Address: {request.pharmacyAddress}</IonCardSubtitle>
                </>
              )}
            </IonCardHeader>
            <img src={request.image} alt=""/>
            {role === 'pharmacist' ? (
              <>
            <IonButton size="small" onClick={() => markReady(request.id,request.patient)}>Ready</IonButton>
            <IonButton size="small" onClick={() => markCancel(request.id,request.patient)}>Cancel</IonButton>
              </>
            ):request.status === "pending"? null: <IonButton size="small" onClick={() => deleteReq(request.id)}>Delete</IonButton>}
            
            </IonCard>
      ))}
    </IonContent>
  );
};
export default PharmaciesList;
