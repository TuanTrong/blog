import React from "react";
import { Article } from "../models/article";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export interface IArticleData {
  article: Article;
}

export class ArticleComponent extends React.Component<IArticleData> {
  render() {
    return (
      <div className="card mb-4">
        <img
          className="card-img-top"
          src={this.props.article.image}
          alt="Card image cap"
        />
        <div className="card-body">
          <h2 className="card-title">{this.props.article.title}</h2>
          <p className="card-text">{this.props.article.shortContent}</p>

          <Link
            to={`/article/${this.props.article._id}`}
            className="btn btn-primary"
          >
            Read More &rarr;
          </Link>
        </div>
        <div className="card-footer text-muted">
          Posted on&nbsp;
          {formatDate(this.props.article.createDate)}
          &nbsp;by&nbsp;
          <a>{this.props.article.author}</a>
        </div>
      </div>
    );
  }
}
