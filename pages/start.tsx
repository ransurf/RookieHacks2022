import {
  IonApp,
  IonPage,
  IonContent,
  IonButton
} from "@ionic/react";
import Link from "next/link";
import { Header } from "../components/Header";
const Start = () => {
  return (
    <IonApp>
      <IonPage>
        <Header />
        <IonContent>
          <div className="flex flex-col justify-center items-center">
            <h2>I am a</h2>
            <IonButton>
              <Link
                href="/patient/signup"
              >
                <a>Patient</a>
              </Link>
            </IonButton>
            <IonButton>
              <Link
                href="/pharmacist/signup"
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
