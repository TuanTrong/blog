import React from "react";
import { observer } from "mobx-react";
import { Category } from "../../models/category";
import { formatDate } from "../../utils/formatDate";
import { AdminTable } from "./table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { findParentCategory } from "../../utils/categoryUtils";

@observer
export class AdminDashBoard extends React.Component {
  render() {
    return (
      <div>
        <AdminTable
          tableHeaderLabel="Articles"
          apiUrl={process.env.REACT_APP_API_URL_ARTICLE!}
          itemUrl="articles"
          getHeaders={_ => getArticleHeaders()}
        />
        <hr />
        <AdminTable
          tableHeaderLabel="Categories"
          apiUrl={process.env.REACT_APP_API_URL_CATEGORY!}
          itemUrl="categories"
          getHeaders={categories => getCategoryHeaders(categories as any)}
        />
      </div>
    );
  }
}

function getArticleHeaders(): JSX.Element[] {
  return [
    <TableHeaderColumn key="author" dataField="author" dataSort={true}>
      Author
    </TableHeaderColumn>,
    <TableHeaderColumn
      key="publishStatus"
      dataField="publishStatus"
      dataSort={true}
    >
      Publish Status
    </TableHeaderColumn>,
    <TableHeaderColumn
      key="visibleStatus"
      dataField="visibleStatus"
      dataSort={true}
    >
      Visible Status
    </TableHeaderColumn>,
    <TableHeaderColumn
      key="viewCount"
      dataField="viewCount"
      dataSort={true}
      dataAlign="right"
    >
      View Count
    </TableHeaderColumn>,
    <TableHeaderColumn
      key="createDate"
      dataField="createDate"
      dataSort={true}
      dataAlign="right"
      dataFormat={createdDate => formatDate(createdDate, "DD/MM/YYYY")}
    >
      Created Date
    </TableHeaderColumn>
  ];
}

function getCategoryHeaders(categories: Category[]): JSX.Element[] {
  return [
    <TableHeaderColumn
      key="parentId"
      dataField="parentId"
      dataSort={true}
      dataFormat={parentId => findParentCategory(categories, parentId)}
    >
      Sub Category Of
    </TableHeaderColumn>
  ];
}
