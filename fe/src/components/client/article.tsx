import React from "react";
import { Article } from "../../models/article";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import * as tags from "./tags";

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
          alt="Card cap"
        />
        <div className="card-body">
          <h2 className="card-title">{this.props.article.title}</h2>
          <p className="card-text">{this.props.article.shortContent}</p>
          {tags.create(this.props.article.tags)}
          <Link
            to={`/articles/show/${this.props.article._id}`}
            className="btn btn-primary"
          >
            Read More &rarr;
          </Link>
        </div>
        <div className="card-footer text-muted">
          Posted on&nbsp;
          {formatDate(this.props.article.createDate)}
          &nbsp;by&nbsp;
          <cite>{this.props.article.author}</cite>
        </div>
      </div>
    );
  }
}
