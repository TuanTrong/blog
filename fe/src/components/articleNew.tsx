import React from "react";
import Axios from "axios";
import { Form, Button } from "react-bootstrap";
import { PublishStatus, VisibleStatus } from "../models/article";
import { Link } from "react-router-dom";

export interface INewArticleProps {}

export interface INewArticleState {
  title: string;
  image: string;
  shortContent: string;
  detailContent?: string;
  tags?: string[];
  author: string;
  publishStatus: PublishStatus;
  visibleStatus: VisibleStatus;
  categoryId?: string;
  validated: boolean;
}

export class NewArticleForm extends React.Component<
  INewArticleProps,
  INewArticleState
> {
  constructor(props: INewArticleProps) {
    super(props);

    this.state = {
      title: "",
      image: `https://picsum.photos/750/300?random=${Math.floor(
        Math.random() * 1000
      ) + 1}`,
      shortContent: "",
      author: "",
      publishStatus: PublishStatus.Draft,
      visibleStatus: VisibleStatus.Normal,
      validated: false
    };
  }

  async handleSubmit(event: any) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });

    await Axios.post(`${process.env.REACT_APP_API_URL_ARTICLE}/0`, {
      title: this.state.title,
      image: this.state.image,
      shortContent: this.state.shortContent,
      detailContent: this.state.detailContent,
      tags: this.state.tags,
      publishStatus: this.state.publishStatus,
      visibleStatus: this.state.visibleStatus,
      categoryId: this.state.categoryId
    });
  }

  render() {
    const { validated } = this.state;
    return (
      <div>
        <h1 className="mt-4">
          Create new Article
          <Link to={"/"} className="btn btn-light float-right align-bottom">
            &lArr; Back
          </Link>
        </h1>
        <hr />
        <Form
          noValidate
          validated={validated}
          onSubmit={(e: any) => this.handleSubmit(e)}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Title"
              onChange={(e: any) => this.setState({ title: e.target.value })}
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
              defaultValue={this.state.image}
              onChange={(e: any) => this.setState({ image: e.target.value })}
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
              onChange={(e: any) =>
                this.setState({ shortContent: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please enter Short Content.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Detail Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Detail Content"
              onChange={(e: any) =>
                this.setState({ detailContent: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tags"
              onChange={(e: any) => this.setState({ tags: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Author"
              onChange={(e: any) => this.setState({ author: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Author.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Publish Status</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Publish Status"
              defaultValue={this.state.publishStatus}
              onChange={(e: any) =>
                this.setState({ publishStatus: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please enter Publish Status.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Visible Status</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Visible Status"
              defaultValue={this.state.visibleStatus}
              onChange={(e: any) =>
                this.setState({ visibleStatus: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please enter Visible Status.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Category"
              onChange={(e: any) =>
                this.setState({ categoryId: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please enter Category.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </div>
    );
  }
}
