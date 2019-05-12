import React from "react";
import Axios from "axios";

import * as navigation from "./components/navigation";
import * as footer from "./components/footer";
import * as category from "./components/category";
import * as article from "./components/article";
import { Article } from "./models/article";

interface IAppProps {}

interface IAppState {
  articles: [];
}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:4000/article").then(res => {
      this.setState({ articles: res.data });
    });
  }

  render() {
    return (
      <div>
        {navigation.create()}
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="my-4">New Articles</h1>

              {this.state.articles.map((a: Article, index: number) => (
                <article.ArticleComponent key={index} data={a} />
              ))}

              <ul className="pagination justify-content-center mb-4">
                <li className="page-item">
                  <a className="page-link" href="/">
                    &larr; Older
                  </a>
                </li>
                <li className="page-item disabled">
                  <a className="page-link" href="/">
                    Newer &rarr;
                  </a>
                </li>
              </ul>
            </div>
            {category.create()}
          </div>
        </div>
        {footer.create()}
      </div>
    );
  }
}

export default App;
