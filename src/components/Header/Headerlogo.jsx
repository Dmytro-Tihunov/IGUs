import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";

function Headerlogo() {
  return (
    <div className="headerLogoSection">
      <Container>
        <Row>
          <Col className="col-12">
            <div className="logoPart">
              <img
                src="../img/headerLogo.png"
                className="img-fluid"
                alt="logo"
              />
              <div className="explanations">
                /ee: gu:/
                <br />
                <b>(informal)</b>
                <br/>
                1. Acryom: "I Got U,"
                <br/>
                a. Used to indicate taking care of the situation that one is in
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Headerlogo;
