import React from "react";
import { Col, Card } from "react-bootstrap";

function ReviewCard(props) {
  return (
    <Col className="col-12 col-lg-4">
      <Card>
        <Card.Body>
          <Card.Title>{props.Title}</Card.Title>
          <Card.Text>{props.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ReviewCard;
