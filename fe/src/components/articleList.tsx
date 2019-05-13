import React from "react";
import Axios from "axios";

import { ArticleComponent } from "./article";
import { Article } from "../models/article";

interface IArticleListProps {}

interface IArticleListState {
  articles: [];
}

export class ArticleList extends React.Component<
  IArticleListProps,
  IArticleListState
> {
  constructor(props: IArticleListProps) {
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
        <h1 className="my-4">I'm a Developer & I love...</h1>

        {this.state.articles.map((a: Article) => (
          <ArticleComponent key={a._id} article={a} />
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
    );
  }
}
