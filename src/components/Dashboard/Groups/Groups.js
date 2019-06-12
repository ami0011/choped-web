import React, { Component } from "react";
import axios from "../../../axiosInstance";
import Table from "../../UI/Table/Table";
import { connect } from "react-redux";
import CustomModal from "../../UI/Modal/Modal";
import { Divider } from 'antd';


class Groups extends Component {
  state = {
    groups: [],
      showGroupJoinModal: false,
      showDeleteGroupModal: false
  };

  componentWillMount() {
    axios
      .get(`/groups/${this.props.userId}`)
      .then(response => {
        const groups = response.data.map(group => {
          return {
            ...group,
            members: group.members.length,
            startDate: `${new Date(group.startDate).getFullYear()}-${new Date(
              group.startDate
            ).getMonth()}-${new Date(group.startDate).getDate()}`,
            key: group.firebaseId
          };
        });
        this.setState({ groups });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Created On",
        dataIndex: "startDate",
        key: "startDate"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Total Members",
        dataIndex: "members",
        key: "members"
      },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: text => <span>
                    <a href="javascript:;" onClick={() => {this.setState({ showGroupJoinModal: true })}}>Join</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Edit</a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={() => {this.setState({ showDeleteGroupModal: true })}}>Delete</a>
                </span>
        }
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.groups}/>
          <CustomModal
              title="Join Group"
              visible={this.state.showGroupJoinModal}
              handleSubmit={() => {this.setState({ showGroupJoinModal: false })}}
              handleCancel={() => {this.setState({ showGroupJoinModal: false })}}
              children={<p>Join group: 'food8'</p>}
          />
          <CustomModal
              title="Delete Conversation"
              visible={this.state.showDeleteGroupModal}
              handleSubmit={() => {this.setState({ showDeleteGroupModal: false })}}
              handleCancel={() => {this.setState({ showDeleteGroupModal: false })}}
              children={<p>Are you sure you want to delete this group?</p>}
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

export default connect(mapStateToProps)(Groups);
