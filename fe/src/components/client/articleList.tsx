import React from "react";
import Axios from "axios";
import { ArticleComponent } from "./article";
import { Article } from "../../models/article";
import { sortArticleByCreatedDate } from "../../utils/articleUtils";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export class ArticleList extends React.Component {
  @observable
  articles: Article[] = [];

  async componentDidMount() {
    let result = await Axios.get(`${process.env.REACT_APP_API_URL_ARTICLE}`);

    this.articles = result.data;
  }

  render() {
    return (
      <div className="col-md-9">
        <h1 className="my-4">{process.env.REACT_APP_HEADER_TITLE}</h1>
        <div className="card-columns">
          {sortArticleByCreatedDate(this.articles).map((a: Article) => (
            <ArticleComponent key={a._id} article={a} />
          ))}
        </div>
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
