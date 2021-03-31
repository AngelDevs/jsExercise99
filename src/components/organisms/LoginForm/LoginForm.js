import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { FormGroupInput } from "../../molecules/FormGroupInput/FormGroupInput";
import { profileRoute } from "../../../pages/routes";
import {
  UNAUTHORIZED_ERROR,
  UNEXPECTED_ERROR,
} from "../../../helpers/errorHandler";
import { BlockedContext } from "../../../features/authentication/context/BlockedContext";
import { useAuthSignUp } from "../../../features/authentication/hooks/useAuthSignUp";
import {
  checkForSpecialCharacters,
  removeSpecialCharacters,
} from "../../../helpers/inputValidator";

import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [loginError, setLoginError] = useState();
  const [count, setCounter] = useState(0);
  const { blocked, setBlocked } = useContext(BlockedContext);
  const [loading, asyncSignUp] = useAuthSignUp();

  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setUsernameError(null);
    }, 2000);
    return () => {
      clearTimeout(alertTimeOut);
    };
  }, [usernameError]);

  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setPasswordError(null);
    }, 2000);
    return () => {
      clearTimeout(alertTimeOut);
    };
  }, [passwordError]);

  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setLoginError(null);
    }, 2000);
    return () => {
      clearTimeout(alertTimeOut);
    };
  }, [loginError]);

  const onChangeUsername = (e) => {
    let { value } = e.currentTarget;
    let hasSpecialCharacter = checkForSpecialCharacters(value);

    if (hasSpecialCharacter) {
      setUsernameError(
        "Username cannot contain special characters. [a-Z, 0-9]"
      );
      return;
    }

    if (value.length > 10) {
      setUsernameError("Username cannot contain more than 10 characters");
      return;
    }

    value = removeSpecialCharacters(value);
    setUsername(value);
  };

  const onChangePassword = (e) => {
    let { value } = e.currentTarget;

    let hasSpecialCharacter = checkForSpecialCharacters(value);

    if (hasSpecialCharacter) {
      setPasswordError(
        "Password cannot contain special characters. [a-Z, 0-9]"
      );
      return;
    }

    value = removeSpecialCharacters(value);
    setPassword(e.currentTarget.value);
  };

  const handleClickSignUp = async () => {
    if (blocked) {
      setLoginError(
        "You tried to login too many times, your account has been blocked"
      );
      return;
    }

    const data = await asyncSignUp(username, password);
    if (data.error === UNEXPECTED_ERROR) {
      return;
    }

    if (data.error === UNAUTHORIZED_ERROR) {
      setLoginError(`unauthorized, you have ${2 - count} atttemps remaining`);
      let internalCount;
      setCounter((prevCount) => {
        const updatedCount = prevCount + 1;
        internalCount = updatedCount;
        return updatedCount;
      });

      if (internalCount === 3) {
        setBlocked(true);
      }

      return;
    }

    history.push(profileRoute);
  };

  return (
    <Form noValidate>
      <FormGroupInput
        label={"Username"}
        value={username}
        onChange={onChangeUsername}
        placeholder={"Enter username"}
        error={usernameError}
      />
      <FormGroupInput
        label={"Password"}
        value={password}
        onChange={onChangePassword}
        placeholder={"Enter password"}
        error={passwordError}
        type={"password"}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <Button variant="primary" onClick={handleClickSignUp}>
            Submit
          </Button>
        )}
      </div>

      <div className={`${styles.alertContainer} p-2`}>
        {loginError ? <Alert variant={"warning"}>{loginError}</Alert> : null}
      </div>
    </Form>
  );
};
