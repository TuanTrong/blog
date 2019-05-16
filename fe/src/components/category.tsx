import React from "react";
import Axios from "axios";
import MuiTreeView from "material-ui-treeview";
import { Category } from "../models/category";
import { toTree } from "../utils/categoryUtils";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
export class CategoryComponent extends React.Component {
  @observable
  categories: Category[] = [];

  async componentDidMount() {
    var result = await Axios.get(`${process.env.REACT_APP_API_URL_CATEGORY}`);

    this.categories = result.data;
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card my-4">
          <h5 className="card-header">Categories</h5>
          <div className="card-body">
            <div className="row">
              <MuiTreeView tree={toTree(this.categories) as any} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
