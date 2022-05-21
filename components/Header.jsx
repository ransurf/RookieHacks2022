import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

export const Header = (props) => {
    return (<IonHeader>
        <IonToolbar>
          <IonTitle>{!props || !props.text ? "PharmaConnect" : props.text}</IonTitle>
        </IonToolbar>
      </IonHeader>);
}