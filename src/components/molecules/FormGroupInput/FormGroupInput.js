import { Form, Alert } from "react-bootstrap";
import styles from "./FormGroupInput.module.css";

export const FormGroupInput = ({
  className,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) => (
  <Form.Group className={`${styles.formGroup} ${className}`}>
    <Form.Label>{label}</Form.Label>

    <Form.Control
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    <br />
    {error ? <Alert variant={"danger"}>{error}</Alert> : null}
  </Form.Group>
);
