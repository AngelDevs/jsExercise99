import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { loginRoute, profileRoute } from "./pages/routes";
import { ProtectedRoute } from "./features/authentication/components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./features/authentication/context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          exact
          path={loginRoute}
          redirectRoute={profileRoute}
          component={LoginPage}
          isValid={currentUser === null || currentUser === undefined}
        />
        <ProtectedRoute
          exact
          path={profileRoute}
          redirectRoute={loginRoute}
          component={ProfilePage}
          isValid={currentUser !== null && currentUser !== undefined}
        />
      </Switch>
    </Router>
  );
}

export default App;
