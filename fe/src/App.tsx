import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ClientLayout } from "./components/client/clientLayout";
import { AdminLayout } from "./components/admin/adminLayout";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />

          <div className="container pb-2">
            <Switch>
              <Route path="/admin" component={AdminLayout} />
              <Route path="/" component={ClientLayout} />
            </Switch>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
