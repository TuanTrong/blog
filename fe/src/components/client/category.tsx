import React from "react";
import axios from "../../utils/axios";
import MuiTreeView from "material-ui-treeview";
import { Category } from "../../models/category";
import { toTree } from "../../utils/categoryUtils";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Redirect } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

@observer
export class CategoryComponent extends React.Component {
  @observable
  categories: Category[] = [];

  @observable
  selectedCategoryId: string = "";

  async componentDidMount() {
    var result = await axios.get(`${process.env.REACT_APP_API_URL_CATEGORY}`);

    this.categories = result.data;
  }

  render() {
    if (this.selectedCategoryId)
      return (
        <Redirect
          push={true}
          to={`/categories/show/${this.selectedCategoryId}`}
        />
      );

    return (
      <Col md={{ span: 3 }}>
        <div className="my-4">
          <h5>Categories</h5>
          <Row>
            <MuiTreeView
              tree={toTree(this.categories) as any}
              onLeafClick={category =>
                (this.selectedCategoryId = String(category.id))
              }
            />
          </Row>
        </div>
      </Col>
    );
  }

  componentDidUpdate() {
    if (this.selectedCategoryId) this.selectedCategoryId = "";
  }
}
