import React from "react";
import Axios from "axios";
import { Article } from "../models/article";
import { RouteComponentProps } from "react-router";
import { formatDate } from "../utils/formatDate";

export interface IArticleDetailProps {
  articleId: string;
}

export interface IArticleDetailState {
  article: Article;
}

export class ArticleDetailComponent extends React.Component<
  RouteComponentProps<IArticleDetailProps>,
  IArticleDetailState
> {
  state = {
    article: new Article()
  };

  componentDidMount() {
    Axios.get(
      `http://localhost:4000/article/${this.props.match.params.articleId}`
    ).then(res => {
      this.setState({ article: res.data });
    });
  }

  render() {
    return (
      <div>
        <h1 className="mt-4">{this.state.article.title}</h1>
        <p className="lead">
          by
          <a href="/"> {this.state.article.author}</a>
        </p>
        <hr />
        <p>Posted on {formatDate(this.state.article.createDate)}</p>
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
        <div className="card my-4">
          <h5 className="card-header">Leave a Comment:</h5>
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea className="form-control" rows={3} />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="media mb-4">
          <img
            className="d-flex mr-3 rounded-circle"
            src="http://placehold.it/50x50"
            alt=""
          />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
        </div>

        <div className="media mb-4">
          <img
            className="d-flex mr-3 rounded-circle"
            src="http://placehold.it/50x50"
            alt=""
          />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
            <div className="media mt-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>
            <div className="media mt-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
