import React, { Component } from 'react';
import Table from "../../UI/Table/Table";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";

class Files extends Component {
    state={
      files: []
    };

    componentWillMount() {
        axios
            .get(`/files/${this.props.userId}`)
            .then(response => {
                const files = response.data.map(file => {
                    return {
                        ...file,
                        key: file.firebaseId
                    };
                });
                this.setState({ files });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        console.log('files', this.state.files);
        const columns = [
            {
                title: "File Name",
                dataIndex: "name",
                key: "name"
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
                <Table columns={columns} dataSource={this.state.files}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Files);