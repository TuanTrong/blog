import React from "react";
import axios from "../utils/axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { saveToken, isLoggedIn } from "../utils/cookie";
import { Redirect } from "react-router";

@observer
export class LoginForm extends React.Component {
  @observable username: string = "";
  @observable password: string = "";

  @observable validated: boolean = false;
  @observable isLoginSuccessfully: boolean = false;

  async handleSubmit(event: any) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.stopPropagation();

      this.validated = true;
    } else {
      var result = await axios.post(`${process.env.REACT_APP_API_URL_USER}`, {
        username: this.username,
        password: this.password
      });

      saveToken(result.data);
      this.isLoginSuccessfully = true;

      window.scrollTo(0, 0);
    }
  }

  render() {
    if (isLoggedIn()) return <Redirect to="/admin" />;

    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form
            noValidate
            validated={this.validated}
            onSubmit={(e: any) => this.handleSubmit(e)}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                defaultValue={this.username}
                onChange={(e: any) => (this.username = e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter Username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                defaultValue={this.password}
                onChange={(e: any) => (this.password = e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter Password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
