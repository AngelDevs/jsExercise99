import { Card, Button, ListGroup } from "react-bootstrap";
import image from "../../../pages/LoginPage/bg.jpg";
export const PendingCard = ({
  title,
  description,
  weight,
  priceToPay,
  supplier,
  courier,
  courierTracking,
  internalTracking,
}) => {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>description:</b> {description}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>weight:</b> {weight}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>priceToPay:</b> {priceToPay}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>supplier:</b> {supplier}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>courier:</b> {courier}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>courier tracking:</b> {courierTracking}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>internal tracking:</b> {internalTracking}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
