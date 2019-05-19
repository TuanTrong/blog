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
          alt={this.props.article.shortContent}
        />
        <div className="card-body">
          <Link
            to={`/articles/show/${this.props.article._id}`}
            className="card-link card-title"
          >
            {this.props.article.title}
          </Link>
          <p className="card-text">{this.props.article.shortContent}</p>
          {tags.create(this.props.article.tags)}
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Posted on&nbsp;
            {formatDate(this.props.article.createDate)}
            &nbsp;by&nbsp;
            <cite>{this.props.article.author}</cite>
          </small>
        </div>
      </div>
    );
  }
}
