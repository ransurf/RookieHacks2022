import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from "@ionic/react";
import Link from "next/link";
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
          <div className="flex flex-col justify-center items-center">
            <h2>I am a</h2>
            <IonButton>
              <Link
                href={{
                  pathname: "/signin",
                  query: { patientIsPharmacy: false }
                }}
              >
                <a>Patient</a>
              </Link>
            </IonButton>
            <IonButton>
              <Link
                href={{
                  pathname: "/signin",
                  query: { patientIsPharmacy: true }
                }}
              >
                <a>Pharmacist</a>
              </Link>
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default Start;