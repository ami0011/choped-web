import React, { Component } from 'react';
import Table from "../../UI/Table/Table";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";
import { Upload, Button, Icon, Tag, Input, Tooltip } from 'antd';
import CustomModal from "../../UI/Modal/Modal";


class Files extends Component {
    state = {
        files: [],
        fileRequest: {},
        uploading: false,
        selectedFile: null,
        showUploadModal: false,
        tags: ['Tag1', 'Example 2', 'Tag 3'],
        inputVisible: false,
        inputValue: '',
    };

    componentWillMount() {
        axios
            .get(`/files/user/${this.props.userId}`)
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

    handleUpload = () => {
        const { fileRequest } = this.state;
        axios.post('files/upload', fileRequest)
            .then(response => {
                if(response.data.key){
                    this.state.fileRequest = {
                        ...this.state.fileRequest,
                        key: response.data.key
                    }
                }
                axios.post('/files', this.state.fileRequest);
                setInterval(
                    axios
                        .get(`/files/user/${this.props.userId}`)
                        .then(response => {
                            const files = response.data.map(file => {
                                return {
                                    ...file,
                                    key: file.firebaseId
                                };
                            });
                            this.setState({ files, showUploadModal: false });
                        })
                        .catch(error => {
                            console.log(error);
                        }), 5000)
            })
    };

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    renderUploadModal = () => {
        this.setState({ showUploadModal: !this.state.showUploadModal })
    };

    render(){
        const { files, uploading, tags, inputVisible, inputValue, fileRequest } = this.state;
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

        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.files.indexOf(file);
                    const newFileList = state.files.slice();
                    newFileList.splice(index, 1);
                    return {
                        files: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                fileRequest.name = file.name;
                fileRequest.description = file.name;
                fileRequest.size = file.size.toString();
                fileRequest.type = file.type;
                fileRequest.tags = this.state.tags;
                fileRequest.owner = this.props.userId;
                this.setState({ fileRequest });
                return false;
            },
            files,
        };
        return (
            <div>
                <Table columns={columns} dataSource={this.state.files}/>
                <Button type={'primary'} shape={'circle'} icon={'plus'} style={{ float: 'right', margin: '30px'}} onClick={this.renderUploadModal}/>
                <CustomModal
                    title="Upload File/s"
                    visible={this.state.showUploadModal}
                    handleSubmit={() => {this.setState({ showUploadModal: false })}}
                    handleCancel={() => {this.setState({ showUploadModal: false })}}
                    children={
                        <div>
                            <Upload {...props}>
                                <Button>
                                    <Icon type={"upload"}/> Select File
                                </Button>
                            </Upload>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={files.length === 0}
                                loading={uploading}
                                style={{ marginTop: 16 }}
                            >
                                {uploading ? 'Uploading' : 'Start Uploading'}
                            </Button>
                        <div style={{ marginTop: '20px' }}>
                        {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                                <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                            );
                            return isLongTag ? (
                                <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                </Tooltip>
                            ) : (
                                tagElem
                            );
                        })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                        )}
                    {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <Icon type="plus" /> New Tag
                        </Tag>
                        )}
                        </div>
                        </div>
                    }
                />
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
