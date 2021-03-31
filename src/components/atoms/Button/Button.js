import { Button as BootstrapButton } from "react-bootstrap";

export const Button = ({ children, onClick, variant = "primary" }) => {
  return (
    <BootstrapButton variant={variant} onClick={onClick}>
      {children}
    </BootstrapButton>
  );
};
