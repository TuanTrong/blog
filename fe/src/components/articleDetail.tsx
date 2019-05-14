import React from "react";
import Axios from "axios";
import { Article } from "../models/article";
import { RouteComponentProps, Redirect } from "react-router";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { redirectToPath } from "../utils/redirectToPath";
import * as tags from "./tags";

export interface IArticleDetailProps {
  articleId: string;
}

export interface IArticleDetailState {
  article: Article;
  isLoadingError: boolean;
}

export class ArticleDetailComponent extends React.Component<
  RouteComponentProps<IArticleDetailProps>,
  IArticleDetailState
> {
  state: IArticleDetailState = {
    isLoadingError: false,
    article: new Article()
  };

  async componentDidMount() {
    try {
      var result = await Axios.get(
        `${process.env.REACT_APP_API_URL_ARTICLE}/${
          this.props.match.params.articleId
        }`
      );

      this.setState({ article: result.data });
    } catch (error) {
      this.setState({ isLoadingError: true });
    }
  }

  componentDidUpdate() {}

  render() {
    if (this.state.isLoadingError) return <Redirect to="/" />;
    return (
      <div>
        <h1 className="mt-4">
          {this.state.article.title}
          <Link to={"/"} className="btn btn-light float-right align-bottom">
            &lArr; Back
          </Link>
        </h1>
        <p className="lead">
          by
          <cite> {this.state.article.author}</cite>
        </p>
        <hr />
        <p>Posted on {formatDate(this.state.article.createDate)}</p>
        <hr />
        {tags.create(this.state.article.tags)}
        <hr />
        <img
          className="img-fluid rounded"
          src={this.state.article.image}
          alt=""
        />
        <hr />
        <p className="lead">{this.state.article.shortContent}</p>
        <p>{this.state.article.detailContent}</p>
        <hr />
        <div className="btn-toolbar float-right">
          <Button
            onClick={(e: React.MouseEvent) => this.editArticle(e)}
            className="btn btn-warning mr-2"
          >
            &#x270E; Edit
          </Button>
          <Button
            onClick={(e: React.MouseEvent) => {
              if (
                window.confirm(
                  `Are you sure to delete article: ${this.state.article.title}?`
                )
              ) {
                this.deleteArticle(e);
              }
            }}
            className="btn btn-danger"
          >
            &#x1f5d1; Delete
          </Button>
        </div>
      </div>
    );
  }

  editArticle(e: React.MouseEvent): void {}

  async deleteArticle(e: React.MouseEvent): Promise<void> {
    var result = await Axios.delete(
      `${process.env.REACT_APP_API_URL_ARTICLE}/${
        this.props.match.params.articleId
      }`
    );

    if (result.data === "deleted") {
      redirectToPath(this, "/");
    }
  }
}
