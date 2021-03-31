import { useState, useEffect, useContext } from "react";
import { Form, Button, Alert, Spinner, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { profileRoute } from "../../../pages/routes";

import {
  UNAUTHORIZED_ERROR,
  UNEXPECTED_ERROR,
} from "../../../helpers/errorHandler";

import { useAuthSignUp } from "../../../features/authentication/hooks/useAuthSignUp";
import { BlockedContext } from "../../../features/authentication/context/BlockedContext";
export const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [loading, asyncSignUp] = useAuthSignUp();
  const [count, setCounter] = useState(0);
  const { blocked, setBlocked } = useContext(BlockedContext);

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

  const onChangeUsername = (e) => {
    let { value } = e.currentTarget;
    let hasSpecialCharacter = value.match(/[^a-zA-Z0-9]/g) != null;

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

    value = value.replace(/[^a-zA-Z0-9]/g, "");
    setUsername(value);
  };

  const onChangePassword = (e) => {
    let { value } = e.currentTarget;

    let hasSpecialCharacter = value.match(/[^a-zA-Z0-9]/g) != null;

    if (hasSpecialCharacter) {
      setPasswordError(
        "Password cannot contain special characters. [a-Z, 0-9]"
      );
      return;
    }

    setPassword(e.currentTarget.value);
  };

  const handleClickSignUp = async () => {
    if (blocked) {
      alert("blocked");
      return;
    }

    const data = await asyncSignUp(username, password);
    console.log(data);
    if (data.error === UNEXPECTED_ERROR) {
      console.log("asdf");
      return;
    }

    if (data.error === UNAUTHORIZED_ERROR) {
      alert(`unauthorized, you have ${count} atttemps remaining`);
      setCounter((prevCount) => {
        return prevCount + 1;
      });

      if (count) {
        setBlocked(true);
      }

      return;
    }

    history.push(profileRoute);
  };

  return (
    <Form noValidate>
      <Form.Group controlId="formBasicEmail" style={{ width: "250px" }}>
        <Form.Label>Username</Form.Label>

        <Form.Control
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="Enter Username"
        />
        <br />
        {usernameError ? (
          <Alert key={""} variant={"danger"}>
            {usernameError}
          </Alert>
        ) : null}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
        <br />
        {passwordError ? (
          <Alert key={""} variant={"danger"}>
            {passwordError}
          </Alert>
        ) : null}
      </Form.Group>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <Button variant="primary" onClick={handleClickSignUp}>
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};
