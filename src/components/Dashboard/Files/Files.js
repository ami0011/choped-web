import React, { Component } from 'react';
import Table from "../../UI/Table/Table";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";
import { Upload, Button, Icon, message, Tag, Input, Tooltip } from 'antd';
import CustomModal from "../../UI/Modal/Modal";

const { Dragger } = Upload;

const fileRequest = [];

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
            fileRequest.push({
                size: info.file.size,
                fileType: info.file.type,
                _id: '',
                name: info.file.name,
                description: info.file.name,
                type: info.file.type,
                owner: '',
                createdAt: info.file.lastModifiedDate.toISOString(),
                _v: '',
                firebaseId: ''
            });
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Files extends Component {
    state={
        files: [],
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

    submitFileUpload = () => {
      console.log('file upload request', fileRequest);
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
        const { tags, inputVisible, inputValue } = this.state;
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
                <Button type={'primary'} shape={'circle'} icon={'plus'} style={{ float: 'right', margin: '30px'}} onClick={this.renderUploadModal}/>
                <CustomModal
                    title="Upload File/s"
                    visible={this.state.showUploadModal}
                    handleSubmit={this.submitFileUpload}
                    handleCancel={() => {this.setState({ showUploadModal: false })}}
                    children={
                        <div>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single/multiple file upload(s)</p>
                        </Dragger>
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
