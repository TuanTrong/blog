import React from "react";
import * as navigation from "./components/navigation";
import * as footer from "./components/footer";
import { BrowserRouter, Route } from "react-router-dom";
import { ArticleDetailComponent } from "./components/articleDetail";
import { ArticleList } from "./components/articleList";
import { CategoryComponent } from "./components/category";
import { NewArticleForm } from "./components/articleNew";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {navigation.create()}

          <div className="container">
            <div className="row">
              {<CategoryComponent />}
              <div className="col-md-8 pb-2">
                <Route path="/" component={ArticleList} exact={true} />
                <Route
                  path="/new/article"
                  component={NewArticleForm}
                  exact={true}
                />
                <Route
                  path="/article/:articleId"
                  component={ArticleDetailComponent}
                />
              </div>
            </div>
          </div>

          {footer.create()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
