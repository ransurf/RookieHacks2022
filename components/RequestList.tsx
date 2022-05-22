import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
  requests: Array<Object>;

  onChange: (data: any) => void;
}

interface Request {
    id: string;
    name: string;
    address: string;
}


const PharmaciesList: React.FC<Props> = (props: Props) => {
  const { requests, onChange } = props;


  return (
    <IonList onChange={onChange}>
      {requests && requests.map((request: Request) => (
        <IonItem key={request.id}>
          <IonLabel>{request.name}</IonLabel>
          <IonLabel>{request.address}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
export default PharmaciesList;
