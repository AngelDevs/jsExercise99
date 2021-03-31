import React from "react";
import { LoginForm } from "../../components/molecules/FormControl/LoginForm";

import "./bg.jpg";
import styles from "./LoginPage.module.css";
export const LoginPage = () => {
  return (
    <main className={`${styles.main}`}>
      <div
        className={`d-flex justify-content-center align-items-center ${styles.body}`}
      >
        <LoginForm></LoginForm>
      </div>
    </main>
  );
};
