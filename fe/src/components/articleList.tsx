import React from "react";
import Axios from "axios";

import { ArticleComponent } from "./article";
import { Article } from "../models/article";
import { Link } from "react-router-dom";
import { sortArticleByCreatedDate } from "../utils/articleUtils";

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
    Axios.get(`${process.env.REACT_APP_API_URL_ARTICLE}`).then(res => {
      this.setState({ articles: res.data });
    });
  }

  render() {
    return (
      <div>
        <h1 className="my-4">
          I'm a Developer & I love...
          <Link
            to={"/new/article"}
            className="btn btn-light float-right align-bottom"
          >
            &#10133; New Article
          </Link>
        </h1>

        {sortArticleByCreatedDate(this.state.articles).map((a: Article) => (
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
