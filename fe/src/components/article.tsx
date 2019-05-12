import React from "react";
import { Article } from "../models/article";

export interface IArticleData {
  data: Article;
}

export class ArticleComponent extends React.Component<IArticleData> {
  render() {
    return (
      <div className="card mb-4">
        <img
          className="card-img-top"
          src={this.props.data.image}
          alt="Card image cap"
        />
        <div className="card-body">
          <h2 className="card-title">{this.props.data.title}</h2>
          <p className="card-text">{this.props.data.shortContent}</p>
          <a href="/" className="btn btn-primary">
            Read More &rarr;
          </a>
        </div>
        <div className="card-footer text-muted">
          Posted on {this.props.data.createDate} by
          <a href="/"> {this.props.data.author}</a>
        </div>
      </div>
    );
  }
}
