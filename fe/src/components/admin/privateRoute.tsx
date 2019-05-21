import React from "react";
import { Route, Redirect } from "react-router";
import { isLoggedIn } from "../../utils/cookie";

export class PrivateRoute extends Route {
  render() {
    return isLoggedIn() ? <Route {...this.props} /> : <Redirect to="/login" />;
  }
}
