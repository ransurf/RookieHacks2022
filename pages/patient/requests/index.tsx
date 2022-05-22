import { IonContent, IonHeader, IonButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PatientSignUpSchema } from '../../../formSchemas/PatientSignUpSchema';
import { db, auth } from '../../../firebase-config';
import RequestList from '../../../components/RequestList';
import {Header} from '../../../components/Header';
import TabSwitcher from '../../../components/TabSwitcher';

const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);
  const requestsRef = collection(db, 'requests');
  const [requests, setRequests] = React.useState([]);

  const getUserRequests = async () => {
    const q = query(requestsRef, where('patient', '==', user.uid));
    getDocs(q).then(docs => {
      console.log(docs);
      setRequests(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    console.log(requests);
  };

  useEffect(() => {
    if (user) {
      getUserRequests();
    }
  }, [user]);

  return (
    <IonPage>
      <Header text="My Requests: Patient"/>

      <IonContent>
          {requests &&
            <RequestList requests={requests ? requests : []} onSubmit={() => {}} />
          }
      </IonContent>
      <IonButton onClick={() => Router.push('/patient/requests/create')}>
          Create New Request
      </IonButton>
      <TabSwitcher view="patient"/>
    </IonPage>
    
  );
};
export default SignUp;
