import React, { Component } from "react";
import axios from "../../../axiosInstance";
import Table from "../../UI/Table/Table";
import { connect } from "react-redux";
import { Divider } from 'antd';
import CustomModal from "../../UI/Modal/Modal";
import { Input } from 'antd';

class Conversations extends Component {
  state = {
    conversations: [],
      showJoinConvoModal: false,
      showDeleteConvoModal: false
  };

  componentWillMount () {
    axios.get(`/conversations/${this.props.userId}`)
    .then(response => {
      const conversations = response.data.map(conv => {
        return {
          ...conv,
          startDate: `${new Date(conv.startDate).getFullYear()}-${new Date(conv.startDate).getMonth()}-${new Date(conv.startDate).getDate()}`,
          key: conv.firebaseId
        }
      })
      this.setState({ conversations })     
    })
      .catch(error => {
        console.log(error);
    })

  }

    onTextChange = e => {
        console.log(e)
    };

  render() {
    const columns = [
      {
        title: "Chat ID",
        dataIndex: "chatId",
        key: "chatId"
      },
      {
        title: "Created On",
        dataIndex: "startDate",
        key: "startDate"
      },
      {
        title: "Language",
        dataIndex: "language",
        key: "language"
      },
      {
        title: "Intent",
        dataIndex: "intent",
        key: "intent",
      },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: text =>
                <span>
                    <a href="javascript:;" onClick={() => this.setState({ showJoinConvoModal: true })}>Join</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => this.setState({ showDeleteConvoModal: true })}>Delete</a>
                </span>
        }
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.conversations} />
          <CustomModal
              title="Join Conversation"
              visible={this.state.showJoinConvoModal}
              handleSubmit={() => {this.setState({ showJoinConvoModal: false })}}
              handleCancel={() => {this.setState({ showJoinConvoModal: false })}}
              children={
                  <span>
                      <p>Name</p>
                  <Input placeholder="Group Name" allowClear onChange={this.onTextChange} />
                  <p style={{ marginTop: '10px' }}>Description</p>
                  <Input placeholder="Group Description" allowClear onChange={this.onTextChange} />
                  </span>
              }
          />
          <CustomModal
              title="Delete Conversation"
              visible={this.state.showDeleteConvoModal}
              handleSubmit={() => {this.setState({ showDeleteConvoModal: false })}}
              handleCancel={() => {this.setState({ showDeleteConvoModal: false })}}
              children={<p>Are you sure you want to delete this conversation?</p>}
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

export default connect(mapStateToProps)(Conversations);
