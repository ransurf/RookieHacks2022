import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
  requests: Array<Object>;
  onSubmit: (data: any) => void;
}

interface Request {
    id: string;
    name: string;
    address: string;
}

const PharmaciesList: React.FC<Props> = (props: Props) => {
  const { requests, onSubmit } = props;
  const [user, loading] = useAuthState(auth);

  return (
    <IonList>
      {requests &&
        requests.map((request: Request) => (
          <IonItem className="ion-margin" key={request.id}
          >
            <IonLabel >{request.name}</IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};
export default PharmaciesList;
