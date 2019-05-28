import React from "react";
import { CategoryComponent } from "./category";
import { Switch, Route } from "react-router-dom";
import { ArticleList } from "./articleList";
import { ArticleDetailComponent } from "./articleDetail";
import { ArticleListByCategory } from "./articleListByCategory";
import { Row } from "react-bootstrap";

export class ClientLayout extends React.Component {
  render() {
    return (
      <Row>
        <CategoryComponent />
        <Switch>
          <Route
            path="/articles/show/:articleId"
            component={ArticleDetailComponent}
          />
          <Route
            path="/categories/show/:categoryId"
            component={ArticleListByCategory}
          />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Row>
    );
  }
}
