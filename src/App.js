import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { loginRoute, profileRoute } from "./pages/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={loginRoute} component={LoginPage} />
        <Route path={profileRoute} component={ProfilePage} />
      </Switch>
    </Router>
  );
}

export default App;
