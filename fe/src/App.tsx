import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ClientLayout } from "./components/client/clientLayout";
import { AdminLayout } from "./components/admin/adminLayout";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { Container } from "react-bootstrap";
import { LoginForm } from "./components/login";
import { PrivateRoute } from "./components/admin/privateRoute";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />

        <Container className="pb-2">
          <Switch>
            <PrivateRoute path="/admin" component={AdminLayout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/" component={ClientLayout} />
          </Switch>
        </Container>

        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
