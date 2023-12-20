/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// The grapes theme
import "./theme/grapes/main.scss";

// Utils
import { routes } from "./config";
import { getTheme, isIos, setTheme } from "./utils";

// Components
import { Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp, setupIonicReact, IonRouterOutlet } from "@ionic/react";

// Pages
import { HomePage } from "./pages/home";
import { RecipePage } from "./pages/recipe";
import { PageWithError } from "./components";
import { PrivacyPolicyPage } from "./pages/privacy-policy";

const mode = new URLSearchParams(window.location.search).get("mode");

if (mode) {
  setupIonicReact({
    mode: mode as any,
  });
} else {
  // If android, use md mode
  if (!isIos) {
    setupIonicReact({
      mode: "md",
    });
  } else {
    // Ios everywhere else
    setupIonicReact({
      mode: "ios",
    });
  }
}

// Set theme
setTheme(getTheme());

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={routes.recipe}>
          <RecipePage />
        </Route>
        <Route exact path={routes.home}>
          <HomePage />
        </Route>
        <Route exact path={routes.privacyPolicy}>
          <PrivacyPolicyPage />
        </Route>
        <Route>
          <PageWithError error={{ message: "Page Not Found" }} />
        </Route>
      </IonRouterOutlet>
      {/* <IonTabs>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
