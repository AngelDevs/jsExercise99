import { Navbar, Button } from "react-bootstrap";
import styles from "./Header.module.css";
export const Header = ({ userFullName, onClick }) => (
  <Navbar className={`${styles.header}`}>
    <Navbar.Brand>{userFullName} </Navbar.Brand>

    <div className="d-flex w-100 justify-content-end p-4">
      <Button variant="danger" onClick={onClick}>
        LogOut
      </Button>
    </div>
  </Navbar>
);
