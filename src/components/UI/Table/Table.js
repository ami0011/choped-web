import React, { Component } from "react";
import { Table } from "antd";

export class CustomTable extends Component {
  render() {
    const { dataSource, columns } = this.props;
      return <Table dataSource={dataSource} columns={columns} pagination={false}/>;
  }
}

export default CustomTable;
