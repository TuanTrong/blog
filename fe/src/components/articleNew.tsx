import React from "react";
import Axios from "axios";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { PublishStatus, VisibleStatus } from "../models/article";
import { Link } from "react-router-dom";
import { enumToArray } from "../utils/enumHelper";
import { getRandomImage } from "../utils/random";
import { EditorState, convertToRaw, RawDraftContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Category } from "../models/category";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export class NewArticleForm extends React.Component {
  @observable categories: Category[] = [];

  @observable title: string = "";
  @observable image: string = getRandomImage();
  @observable shortContent: string = "";
  @observable tags?: string[];
  @observable author: string = "";
  @observable publishStatus: PublishStatus = PublishStatus.Draft;
  @observable visibleStatus: VisibleStatus = VisibleStatus.Normal;
  @observable categoryId?: string;
  @observable selectedCategory?: string = "";
  @observable editorState: EditorState = EditorState.createEmpty();
  @observable validated: boolean = false;
  @observable saved: boolean = false;

  detailContent?: RawDraftContentState;

  async handleSubmit(event: any) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.stopPropagation();

      this.validated = true;
    } else {
      await Axios.post(`${process.env.REACT_APP_API_URL_ARTICLE}/0`, {
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
      });

      this.saved = true;
      window.scrollTo(0, 0);
    }
  }

  async componentDidMount() {
    let result = await Axios.get(`${process.env.REACT_APP_API_URL_CATEGORY}`);

    this.categories = result.data;
    this.categoryId = result.data[0]._id;
    this.selectedCategory = result.data[0].title;
  }

  render() {
    return (
      <div>
        <h1 className="mt-4">
          Create new Article
          <Link to={"/"} className="btn btn-light float-right align-bottom">
            &lArr; Back
          </Link>
        </h1>
        <hr />
        {this.saved && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Article saved successfully.</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

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
              onChange={(e: any) => (this.tags = e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Author"
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
          <Button type="submit">Create</Button>
        </Form>
      </div>
    );
  }
}
