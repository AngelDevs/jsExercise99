import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
          path={loginRoute}
          redirectRoute={profileRoute}
          component={LoginPage}
          isValid={currentUser === null}
        />
        <ProtectedRoute
          path={profileRoute}
          redirectRoute={loginRoute}
          component={ProfilePage}
          isValid={currentUser !== null}
        />
      </Switch>
    </Router>
  );
}

export default App;
