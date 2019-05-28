import React from "react";
import { Route, Switch } from "react-router-dom";
import { ArticleForm } from "./articleNew";
import { CategoryForm } from "./categoryNew";
import { AdminDashBoard } from "./dashBoard";
import { Row } from "react-bootstrap";

export class AdminLayout extends React.Component {
  render() {
    return (
      <Row>
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
      </Row>
    );
  }
}
