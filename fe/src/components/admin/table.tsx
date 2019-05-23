import React from "react";
import axios from "../../utils/axios";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  Options,
  SelectRow
} from "react-bootstrap-table";
import { BaseModel } from "../../models/base";
import { Col } from "react-bootstrap";

export interface IAdminTableProps {
  tableHeaderLabel: string;
  getHeaders: (items: BaseModel[]) => JSX.Element[];
  itemUrl: string;
  apiUrl: string;
}

@observer
export class AdminTable extends React.Component<IAdminTableProps> {
  @observable
  items: BaseModel[] = [];

  selectedItems: BaseModel = new BaseModel();

  tableOption: Options = {
    onRowClick: (row: BaseModel) => {
      this.selectedItems = row;
    },

    sizePerPageDropDown: _ => {
      return (
        <div>
          <Link
            to={`/admin/${this.props.itemUrl}/edit/0`}
            className="btn btn-success mr-2"
            title="Create New"
          >
            +
          </Link>
          <Link
            to={`/admin/${this.props.itemUrl}/edit/${this.selectedItems._id}`}
            className="btn btn-warning mr-2"
          >
            &#x270E;
          </Link>
          <Link
            to="#"
            onClick={e => this.deleteItem(e)}
            className="btn btn-danger"
          >
            &#x1f5d1;
          </Link>
        </div>
      );
    }
  };

  tableSelectRowOption: SelectRow = {
    mode: "radio",
    clickToSelect: true,
    className: "table-secondary"
  };

  async componentDidMount() {
    let result = await axios.get(this.props.apiUrl);

    this.items = result.data;
  }

  render() {
    return (
      <Col md={{ span: 12 }}>
        <h2>{this.props.tableHeaderLabel}</h2>
        <BootstrapTable
          data={this.items}
          options={this.tableOption}
          selectRow={this.tableSelectRowOption}
          pagination
          hover
        >
          <TableHeaderColumn dataField="_id" isKey={true} hidden>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort={true}>
            Title
          </TableHeaderColumn>
          {this.props.getHeaders(this.items)}
        </BootstrapTable>
      </Col>
    );
  }

  async deleteItem(e: React.MouseEvent): Promise<void> {
    e.preventDefault();

    if (
      !this.selectedItems._id ||
      !window.confirm(`Are you sure to delete: ${this.selectedItems.title}?`)
    )
      return;

    let result = await axios.delete(
      `${this.props.apiUrl}/${this.selectedItems._id}`
    );

    if (result.data === "deleted") {
      this.items = this.items.filter(
        item => item._id !== this.selectedItems._id
      );
    }
  }
}
