import React from "react";
import {
  Form,
  Button,
  DropdownButton,
  Dropdown,
  Col,
  Alert
} from "react-bootstrap";
import { PublishStatus, VisibleStatus } from "../../models/article";
import { RouteComponentProps } from "react-router-dom";
import { enumToArray } from "../../utils/enumHelper";
import { getRandomImage } from "../../utils/random";
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Category } from "../../models/category";
import { observer } from "mobx-react";
import { observable } from "mobx";
import axios from "../../utils/axios";
import { scrollToTop } from "../../utils/scrollTop";

export interface IArticleFormProps {
  articleId: string;
}

@observer
export class ArticleForm extends React.Component<
  RouteComponentProps<IArticleFormProps>
> {
  @observable categories: Category[] = [];
  @observable validated: boolean = false;
  @observable saved: boolean = false;

  @observable title: string = "";
  @observable image: string = "";
  @observable shortContent: string = "";
  @observable tags?: string[];
  @observable author: string = "";
  @observable publishStatus: PublishStatus = PublishStatus.Draft;
  @observable visibleStatus: VisibleStatus = VisibleStatus.Normal;
  @observable categoryId?: string;
  @observable selectedCategory?: string = "";
  @observable editorState: EditorState = EditorState.createEmpty();

  detailContent?: RawDraftContentState;
  isCreating: boolean = this.props.match.params.articleId === "0";

  async handleSubmit(event: any) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.stopPropagation();

      this.validated = true;
    } else {
      const data = this.createArticleData();

      if (this.isCreating) {
        await axios.post(`${process.env.REACT_APP_API_URL_ARTICLE}`, data);
      } else {
        await axios.put(
          `${process.env.REACT_APP_API_URL_ARTICLE}/${
            this.props.match.params.articleId
          }`,
          data
        );
      }

      this.saved = true;
      scrollToTop();
    }
  }

  async componentDidMount() {
    let categories = await axios.get(
      `${process.env.REACT_APP_API_URL_CATEGORY}`
    );
    this.categories = categories.data;

    if (!this.isCreating) {
      await this.loadArticleById();
    } else {
      this.setNewArticleValue();
    }
  }

  render() {
    return (
      <Col md={{ span: 12 }}>
        <h1 className="mt-4">
          {this.isCreating ? "Create new Article" : "Edit Article"}
        </h1>
        <hr />

        <Alert variant="success" show={this.saved}>
          <strong>Article saved successfully.</strong>
        </Alert>

        <Form
          noValidate
          validated={this.validated}
          onSubmit={(e: any) => this.handleSubmit(e)}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Title"
              defaultValue={this.title}
              onChange={(e: any) => (this.title = e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Image URL"
              defaultValue={this.image}
              onChange={(e: any) => (this.image = e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Image URL.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Short Content</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Short Content"
              defaultValue={this.shortContent}
              onChange={(e: any) => (this.shortContent = e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Short Content.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Detail Content</Form.Label>
            <Editor
              editorState={this.editorState}
              wrapperClassName="editor-wrapper"
              editorClassName="editor-main"
              toolbarClassName="editor-toolbar"
              onEditorStateChange={editorState =>
                (this.editorState = editorState)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tags seperated by ,"
              defaultValue={this.tags}
              onChange={(e: any) => (this.tags = e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Author"
              defaultValue={this.author}
              onChange={(e: any) => (this.author = e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Author.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Publish Status</Form.Label>

            <DropdownButton
              id="publish-status-dropdown"
              title={this.publishStatus}
            >
              {enumToArray(PublishStatus).map((status: string) => {
                return (
                  <Dropdown.Item
                    key={status}
                    eventKey={status}
                    onSelect={(status: string) =>
                      (this.publishStatus = status as PublishStatus)
                    }
                  >
                    {status}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Form.Group>
          <Form.Group>
            <Form.Label>Visible Status</Form.Label>
            <DropdownButton
              id="visible-status-dropdown"
              title={this.visibleStatus}
            >
              {enumToArray(VisibleStatus).map((status: string) => {
                return (
                  <Dropdown.Item
                    key={status}
                    eventKey={status}
                    onSelect={(status: string) =>
                      (this.visibleStatus = status as VisibleStatus)
                    }
                  >
                    {status}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <DropdownButton
              id="category-dropdown"
              title={this.selectedCategory}
            >
              {this.categories
                .filter(category => !category.nodes || !category.nodes.length)
                .map((category: Category) => {
                  return (
                    <Dropdown.Item
                      key={category._id}
                      eventKey={category._id}
                      onSelect={(categoryId: string) => {
                        this.categoryId = categoryId;
                        this.selectedCategory = category.title || "";
                      }}
                    >
                      {category.title}
                    </Dropdown.Item>
                  );
                })}
            </DropdownButton>
          </Form.Group>
          <Button type="submit">{this.isCreating ? "Create" : "Save"}</Button>
        </Form>
      </Col>
    );
  }

  private async loadArticleById() {
    let articleResult = await axios.get(
      `${process.env.REACT_APP_API_URL_ARTICLE}/${
        this.props.match.params.articleId
      }`
    );
    this.title = articleResult.data.title;
    this.image = articleResult.data.image;
    this.shortContent = articleResult.data.shortContent;
    if (articleResult.data.detailContent)
      this.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(articleResult.data.detailContent))
      );
    this.tags = articleResult.data.tags.join();
    this.author = articleResult.data.author;
    this.publishStatus = articleResult.data.publishStatus;
    this.visibleStatus = articleResult.data.visibleStatus;
    this.categoryId = articleResult.data.categoryId;
    this.selectedCategory = this.categories.find(
      category => category._id === this.categoryId
    )!.title;
  }

  private setNewArticleValue() {
    this.image = getRandomImage();
    this.categoryId = this.categories[0]._id;
    this.selectedCategory = this.categories[0].title;
  }

  private createArticleData() {
    return {
      title: this.title,
      image: this.image,
      shortContent: this.shortContent,
      detailContent: JSON.stringify(
        convertToRaw(this.editorState.getCurrentContent())
      ),
      tags: String(this.tags).split(","),
      author: this.author,
      publishStatus: this.publishStatus,
      visibleStatus: this.visibleStatus,
      categoryId: this.categoryId
    };
  }
}
