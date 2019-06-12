import React, { Component } from "react";
import { Table, Divider } from "antd";

export class CustomTable extends Component {
  render() {
    const { dataSource, columns, rowSelection } = this.props;
      return <Table dataSource={dataSource} columns={columns} pagination={false} rowSelection={rowSelection}/>;
  }
}

export default CustomTable;
