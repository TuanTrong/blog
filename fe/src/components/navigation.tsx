import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import userStore from "../utils/cookie";
import { observer } from "mobx-react";

@observer
export class Navigation extends React.Component {
  render() {
    return (
      <Navbar variant="dark" bg="dark" expand="lg" fixed="top">
        <Container>
          <Link to="/" className="navbar-brand">
            Happy Coding
          </Link>
          {userStore.isLoggedIn() ? (
            <Link to="/" onClick={() => userStore.logOut()}>
              Logout
            </Link>
          ) : (
            <Link to="/login">login</Link>
          )}
        </Container>
      </Navbar>
    );
  }
}
