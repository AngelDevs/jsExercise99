import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { profileRoute, loginRoute } from "../../../pages/routes";
export const useAuthenticatedRoute = () => {
  const { currentUser, loading: loadingUser } = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingUser) return;
    setLoading(false);

    if (currentUser) {
      history.push(profileRoute);
      return;
    }

    history.push(loginRoute);
  }, [currentUser, loadingUser, history]);

  return [loading];
};
