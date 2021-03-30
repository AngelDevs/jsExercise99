import React, { useState } from "react";
import { useHistory } from "react-router";
import { login } from "../../features/authentication/services/authentication";
import { profileRoute } from "../routes";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChangeUsername = (e) => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const tryLogin = async () => {
    setLoading(true);
    const data = await login(username, password);

    setLoading(false);
    if (data["success"] === false) {
      alert("username or password incorrect");
      return;
    }

    history.push(profileRoute);
  };

  return (
    <main>
      {!loading ? (
        <div>
          <input
            value={username}
            onChange={(e) => onChangeUsername(e)}
            type="text"
          />
          <input
            value={password}
            onChange={(e) => onChangePassword(e)}
            type="password"
          />
          <button onClick={() => tryLogin()}>Login</button>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </main>
  );
};
