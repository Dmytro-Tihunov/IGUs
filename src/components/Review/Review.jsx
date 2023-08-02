import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewCard from "../MainComp/ReviewCard";
import "./Review.css";

function Review() {
  return (
    <section className="reviewSection">
      <Container>
        <Row>
          <Col className="col-12">
            <h1 className="sectionTitle">ABOUT</h1>
          </Col>
        </Row>
        <Row className="cardRow">
          <Col className="col-12 col-lg-10">
            <Row>
              <ReviewCard
                Title="Contact Us"
                Description="If you would like to reach out please drop a message at help@igu.ai"
              />
              <ReviewCard
                Title="Additional Features"
                Description="We aim to add more features, we would love to hear your feedback"
              />
              <ReviewCard
                Title="Be Seen"
                Description="If you would like to be featured om IGU's HOT 3 section please feel free reach out"
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Review;
