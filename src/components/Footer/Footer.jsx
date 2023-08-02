import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footerSection">
      <Container fluid>
        <Row>
          <Col className="col-12">
            <div className="footerContent">
              <div className="logo">
                <img
                  src="/img/headerLogo.png"
                  alt="footerLogo"
                  className="img-fluid"
                />
              </div>
              <div className="socialIcon">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-pinterest"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
