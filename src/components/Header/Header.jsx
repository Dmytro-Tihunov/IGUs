import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../context/AuthProvider";
import OffCanvasHeader from "./OffCanvas";

function Header(props) {
  const { auth, signOut, user } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // Handle logout
  async function handleLogout(e) {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <OffCanvasHeader show={show} onHide={handleClose} placement="top" />
    <section className="headerSection">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            <img src="../img/headerLogo.png" alt="logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="">
              <button className="nav-link" onClick={() => setShow((prev) => !prev)}>Categories</button>
              {!auth && (
                <>
                  <Link to="/login" className="nav-link">
                    {props.linkOne}
                  </Link>
                  <Link to="/signup" className="nav-link">
                    {props.linkTwo}
                  </Link>
                </>
              )}
              {auth && (
                <>
                  <Link to="/" className="nav-link">
                 {user.email}
                  </Link>
                  <button onClick={handleLogout} className="nav-link">
                    Log out
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
    </>
  );
}

export default Header;
