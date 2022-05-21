import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { collection, getDoc, getDocs, query, doc, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../../firebase-config';
import RequestList from '../../../components/RequestList';
import {Header} from '../../../components/Header';
import TabSwitcher from '../../../components/TabSwitcher';

const Requests = () => {
  const [user, loading, error] = useAuthState(auth);
  const requestsRef = collection(db, 'requests');
  const pharmacistsRef = collection(db, 'pharmacists');
  const [requests, setRequests] = React.useState([]);
  const [userPharmacy, setUserPharmacy] = React.useState('');

  const verifyUser = async () => {
      //check through pharmacist refs to see if user is a pharmacist
        const pharmacistRef = doc(pharmacistsRef, user.uid);

        const docSnap = await getDoc(pharmacistRef);

        if (docSnap.exists()) {
            console.log("Pharmacist User Info:", docSnap.data());
            setUserPharmacy(docSnap.data().pharmacy);
        } else {
        console.log("No such document!");
        }
    }


  const getPharmacyRequests = async () => {
      if (!userPharmacy) {
          return <div>No user pharm</div>
        }
    console.log("User Pharmacy:", userPharmacy);
    const q = query(requestsRef, where('pharmacy', 'in', [userPharmacy]));
    getDocs(q).then(docs => {
      console.log("requests of pharmacy", docs);
      setRequests(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    console.log(requests);
  };

    useEffect(() => {
        if (user) {
            verifyUser();
        }
    }, [user]);

  useEffect(() => {
    if (userPharmacy) {
      getPharmacyRequests();
    }
  }, [userPharmacy]);

  return (
    <IonPage>
      <Header text="My Requests"/>

      <IonContent>
          {requests &&
            <RequestList requests={requests ? requests : []} onSubmit={() => {}} />
          }
      </IonContent>
      <TabSwitcher view="patient" />
    </IonPage>
  );
};
export default Requests;
