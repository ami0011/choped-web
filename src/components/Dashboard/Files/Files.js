import React, { Component } from 'react';
import Table from "../../UI/Table/Table";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";
import { Upload, Button, Icon } from 'antd';

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [
        {
            uid: '1',
            name: 'sample1.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png',
        },
        {
            uid: '2',
            name: 'sample2.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
        },
        {
            uid: '3',
            name: 'sample3.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/zzz.png',
        },
    ],
};

class Files extends Component {
    state={
        files: [],
        selectedFile: null
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
                title: "Size in Byte",
                dataIndex: "size",
                key: "size"
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type"
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description"
            },
        ];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.files}/>
                <div style={{ marginTop: '30px', maxWidth: '150px', marginRight: 'auto', marginLeft: 'auto' }}>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                </div>
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
