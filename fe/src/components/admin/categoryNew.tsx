import React from "react";
import Axios from "axios";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { Category } from "../../models/category";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { findParentCategory } from "../../utils/categoryUtils";

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
        await Axios.post(`${process.env.REACT_APP_API_URL_CATEGORY}`, data);
      } else {
        await Axios.put(
          `${process.env.REACT_APP_API_URL_CATEGORY}/${
            this.props.match.params.categoryId
          }`,
          data
        );
      }

      this.saved = true;
      window.scrollTo(0, 0);
    }
  }

  async componentDidMount() {
    let categories = await Axios.get(
      `${process.env.REACT_APP_API_URL_CATEGORY}`
    );
    this.categories = categories.data;

    if (!this.isCreating) {
      let categoryResult = await Axios.get(
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
      <div className="col-md-12">
        <h1 className="mt-4">
          {this.isCreating ? "Create new Category" : "Edit Category"}
          <Link
            to={"/admin"}
            className="btn btn-light float-right align-bottom"
          >
            &lArr; Back
          </Link>
        </h1>
        <hr />
        {this.saved && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Category saved successfully.</strong>
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
      </div>
    );
  }
}
