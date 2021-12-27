import React from "react";
import { Card } from "react-bootstrap";
function CardInfo(props) {
  return (
    <div className="mt-2">
      <Card>
        <Card.Body>
          <Card.Title>
            <strong>{props.title}</strong>
          </Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardInfo;
