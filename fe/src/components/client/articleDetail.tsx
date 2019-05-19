import React from "react";
import Axios from "axios";
import { Article } from "../../models/article";
import { RouteComponentProps, Redirect } from "react-router";
import { formatDate } from "../../utils/formatDate";
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
      <div className="col-md-9">
        <h4 className="mt-4">
          {this.article.title}
          <span className="lead">
            &nbsp; by
            <cite> {this.article.author}</cite>
          </span>
        </h4>
        <p>Posted on {formatDate(this.article.createDate)}</p>
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
      </div>
    );
  }
}
