import React from "react";
import Axios from "axios";
import { Article } from "../models/article";
import { RouteComponentProps, Redirect } from "react-router";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { redirectToPath } from "../utils/redirectToPath";
import * as tags from "./tags";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { observable } from "mobx";
import { observer } from "mobx-react";

export interface IArticleDetailProps {
  articleId: string;
}

@observer
export class ArticleDetailComponent extends React.Component<
  RouteComponentProps<IArticleDetailProps>
> {
  @observable article: Article = new Article();
  @observable isLoadingError: boolean = false;

  async componentDidMount() {
    try {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_URL_ARTICLE}/${
          this.props.match.params.articleId
        }`
      );

      this.article = result.data;
    } catch (error) {
      this.isLoadingError = true;
    }
  }

  render() {
    if (this.isLoadingError) return <Redirect to="/" />;

    let editorState = EditorState.createEmpty();

    if (this.article.detailContent) {
      const contentState = convertFromRaw(
        JSON.parse(this.article.detailContent)
      );
      editorState = EditorState.createWithContent(contentState);
    }

    return (
      <div>
        <h1 className="mt-4">
          {this.article.title}
          <Link to={"/"} className="btn btn-light float-right align-bottom">
            &lArr; Back
          </Link>
        </h1>
        <p className="lead">
          by
          <cite> {this.article.author}</cite>
        </p>
        <hr />
        <p>Posted on {formatDate(this.article.createDate)}</p>
        <hr />
        {tags.create(this.article.tags)}
        <img className="img-fluid rounded" src={this.article.image} alt="" />
        <hr />
        <p className="lead">{this.article.shortContent}</p>
        {this.article.detailContent && (
          <Editor
            editorClassName="editor-overflow-hidden"
            editorState={editorState}
            readOnly={true}
            toolbarHidden={true}
          />
        )}
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
                  `Are you sure to delete article: ${this.article.title}?`
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
    let result = await Axios.delete(
      `${process.env.REACT_APP_API_URL_ARTICLE}/${
        this.props.match.params.articleId
      }`
    );

    if (result.data === "deleted") {
      redirectToPath(this, "/");
    }
  }
}
