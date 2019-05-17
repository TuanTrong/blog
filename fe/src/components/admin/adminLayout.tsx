import React from "react";
import { Route, Switch } from "react-router";
import { ArticleForm } from "./articleNew";
import { CategoryForm } from "./categoryNew";
import { AdminDashBoard } from "./dashBoard";

export class AdminLayout extends React.Component {
  render() {
    return (
      <div className="row">
        <Switch>
          <Route
            path="/admin/articles/edit/:articleId"
            component={ArticleForm}
          />
          <Route
            path="/admin/categories/edit/:categoryId"
            component={CategoryForm}
          />
          <Route path="/" component={AdminDashBoard} />
        </Switch>
      </div>
    );
  }
}
