import React, { Component } from "react";
import axios from "../../../axiosInstance";
import Table from "../../UI/Table/Table";
import { connect } from "react-redux";

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
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.conversations} />
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
