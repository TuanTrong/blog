import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { isLoggedIn } from "../utils/cookie";

export class Navigation extends React.Component {
  render() {
    return (
      <Navbar variant="dark" bg="dark" expand="lg" fixed="top">
        <Container>
          <Link to="/" className="navbar-brand">
            Happy Coding
          </Link>
          {isLoggedIn() ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">login</Link>
          )}
        </Container>
      </Navbar>
    );
  }
}
