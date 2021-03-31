import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

export const useAuthSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { signUp: contextSignUp } = useContext(AuthContext);

  const signUp = async (username, password) => {
    setLoading(true);

    const data = await contextSignUp(username, password);

    setLoading(false);

    return data;
  };

  return [loading, signUp];
};
