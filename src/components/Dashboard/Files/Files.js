import React, { Component } from 'react';
import Table from "../../UI/Table/Table";

class Files extends Component {
    render(){
        const columns = [
            {
                title: "File Name",
                dataIndex: "",
                key: ""
            },
            {
                title: "Size",
                dataIndex: "",
                key: ""
            },
            {
                title: "Date",
                dataIndex: "",
                key: ""
            },
        ];
        return (
            <div>
                <Table columns={columns} />
            </div>
        );
    }
}

export default Files