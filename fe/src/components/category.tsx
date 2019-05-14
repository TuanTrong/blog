import React from "react";
import Axios from "axios";
import MuiTreeView from "material-ui-treeview";
import { Category } from "../models/category";

interface ICategoriesState {
  categories: Category[];
}

export class CategoryComponent extends React.Component {
  state = {
    categories: []
  };

  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_API_URL_CATEGORY}`).then(res => {
      this.setState({ categories: res.data });
    });
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card my-4">
          <h5 className="card-header">Categories</h5>
          <div className="card-body">
            <div className="row">
              <MuiTreeView tree={this.state.categories} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
