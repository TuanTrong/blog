import React from "react";
import { Route, Redirect } from "react-router";
import { observer } from "mobx-react";
import userStore from "../../store/user";

@observer
export class PrivateRoute extends Route {
  render() {
    return userStore.isLoggedIn() ? (
      <Route {...this.props} />
    ) : (
      <Redirect to="/login" />
    );
  }
}
