import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
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
  const usersRef = collection(db, 'users');
  const [requests, setRequests] = React.useState([]);
  const [userPharmacy, setUserPharmacy] = React.useState('');

  const verifyUser = async () => {
      //check through pharmacist refs to see if user is a pharmacist

        // const docSnap = await getDoc(pharmacistRef);

        // if (docSnap.exists()) {
        //     console.log("Pharmacist User Info:", docSnap.data());
        //     if (docSnap.data().pharmacyID) {
        //       setUserPharmacy(docSnap.data().pharmacyID);
        //     } else {
        //       console.log("User is not a pharmacist");
        //     }
        // } else {
        // console.log("No such document!");
        // }

        const q = query(usersRef, where('UID', '==', user.uid));
        getDocs(q).then(docs => {
          if (docs.empty !== true) {
            console.log(docs);
            if (docs.docs[0].data().pharmacyID) {
              setUserPharmacy(docs.docs[0].data().pharmacyID);
            } else {
              console.log("User is not a pharmacist");
            }
          }

          
        });
    }


  const getPharmacyRequests = async () => {
      if (!userPharmacy) {
          return <div>No user pharm</div>
        }
    console.log("User Pharmacy:", userPharmacy);
    const q = query(requestsRef, where('pharmacyID', '==', userPharmacy), where('status', '==', 'pending'));
    getDocs(q).then(docs => {
      console.log("requests of pharmacy: ")
      console.log(docs.docs.map(doc => doc.data()));
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
      <Header text="My Requests: Pharmacy"/>

      <IonContent>
          {requests &&
            <RequestList requests={requests ? requests : []} onSubmit={() => {}} />
          }
        

      </IonContent>
      <TabSwitcher view="pharmacist" />
    </IonPage>
  );
};
export default Requests;
