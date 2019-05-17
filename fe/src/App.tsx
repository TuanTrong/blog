import React from "react";
import * as navigation from "./components/navigation";
import * as footer from "./components/footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ClientLayout } from "./components/client/clientLayout";
import { AdminLayout } from "./components/admin/adminLayout";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {navigation.create()}

          <div className="container pb-2">
            <Switch>
              <Route path="/admin" component={AdminLayout} />
              <Route path="/" component={ClientLayout} />
            </Switch>
          </div>

          {footer.create()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
