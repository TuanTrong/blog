import React from "react";
import axios from "../../utils/axios";
import {
  Form,
  Button,
  DropdownButton,
  Dropdown,
  Col,
  Alert
} from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { Category } from "../../models/category";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { findParentCategory } from "../../utils/categoryUtils";
import { scrollToTop } from "../../utils/scrollTop";

export interface ICategoryFormProps {
  categoryId: string;
}

@observer
export class CategoryForm extends React.Component<
  RouteComponentProps<ICategoryFormProps>
> {
  @observable categories: Category[] = [];

  @observable validated: boolean = false;
  @observable saved: boolean = false;

  @observable title: string = "";
  @observable parentId: string = "";
  @observable selectedParentTitle: string = "";

  isCreating: boolean = this.props.match.params.categoryId === "0";

  async handleSubmit(event: any) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.stopPropagation();

      this.validated = true;
    } else {
      const data = {
        title: this.title,
        parentId: this.parentId
      };

      if (this.isCreating) {
        await axios.post(`${process.env.REACT_APP_API_URL_CATEGORY}`, data);
      } else {
        await axios.put(
          `${process.env.REACT_APP_API_URL_CATEGORY}/${
            this.props.match.params.categoryId
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
      let categoryResult = await axios.get(
        `${process.env.REACT_APP_API_URL_CATEGORY}/${
          this.props.match.params.categoryId
        }`
      );

      this.title = categoryResult.data.title;
      this.parentId = categoryResult.data.parentId;
      this.selectedParentTitle = findParentCategory(
        this.categories,
        this.parentId
      );
    } else {
      this.parentId = this.categories[0]._id!;
      this.selectedParentTitle = this.categories[0].title || "";
    }
  }

  render() {
    return (
      <Col md={{ span: 12 }}>
        <h1 className="mt-4">
          {this.isCreating ? "Create new Category" : "Edit Category"}
        </h1>
        <hr />
        <Alert variant="success" show={this.saved}>
          <strong>Category saved successfully.</strong>
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
          {this.isCreating && (
            <Form.Group>
              <Form.Label>Parent Category</Form.Label>
              <DropdownButton
                id="category-dropdown"
                title={this.selectedParentTitle}
              >
                {this.categories.map((category: Category) => {
                  return (
                    <Dropdown.Item
                      key={category._id}
                      eventKey={category._id}
                      onSelect={(categoryId: string) => {
                        this.parentId = categoryId;
                        this.selectedParentTitle = category.title || "";
                      }}
                    >
                      {category.title}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Form.Group>
          )}
          <Button type="submit">{this.isCreating ? "Create" : "Save"}</Button>
        </Form>
      </Col>
    );
  }
}
