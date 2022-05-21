import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cog, home, list } from "ionicons/icons";
import Profile from "../pages/profile";
const Tabs = () => {
  return (
    <IonTabs>
        <Route path="/profile" component={Profile} exact={true} />

        <Route
          path="/tabs"
          render={() => <Redirect to="/tabs/feed" />}
          exact={true}
        />
      <IonRouterOutlet>

      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/feed">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/profile">
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default Tabs;
