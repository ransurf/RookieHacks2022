import { IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, Button } from '@ionic/react';

const Start = () => {
  return (
    <IonApp>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PharmaConnect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex justify-center items-center">
          <p>Start</p>
        </div>
      </IonContent>
    </IonPage>
    </IonApp>
  );
};

export default Start;
