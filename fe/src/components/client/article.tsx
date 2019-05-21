import React from "react";
import { Article } from "../../models/article";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import * as tags from "./tags";
import { Card } from "react-bootstrap";

export interface IArticleData {
  article: Article;
}

export class ArticleComponent extends React.Component<IArticleData> {
  render() {
    return (
      <Card className="mb-4">
        <Card.Img variant="top" src={this.props.article.image} />
        <Card.Body>
          <Link
            to={`/articles/show/${this.props.article._id}`}
            className="card-link card-title"
          >
            {this.props.article.title}
          </Link>
          <Card.Text>{this.props.article.shortContent}</Card.Text>
          {tags.create(this.props.article.tags)}
        </Card.Body>
        <Card.Footer className="text-muted">
          <small>
            Posted on&nbsp;
            {formatDate(this.props.article.createDate)}
            &nbsp;by&nbsp;
            <cite>{this.props.article.author}</cite>
          </small>
        </Card.Footer>
      </Card>
    );
  }
}
