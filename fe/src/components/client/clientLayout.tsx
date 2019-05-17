import React from "react";
import { CategoryComponent } from "./category";
import { Switch, Route } from "react-router";
import { ArticleList } from "./articleList";
import { ArticleDetailComponent } from "./articleDetail";

export class ClientLayout extends React.Component {
  render() {
    return (
      <div className="row">
        <CategoryComponent />
        <Switch>
          <Route
            path="/articles/show/:articleId"
            component={ArticleDetailComponent}
          />
          <Route path="/" component={ArticleList} />
        </Switch>
      </div>
    );
  }
}
