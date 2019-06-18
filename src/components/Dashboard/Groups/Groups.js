import React, { Component } from "react";
import axios from "../../../axiosInstance";
import Table from "../../UI/Table/Table";
import { connect } from "react-redux";
import CustomModal from "../../UI/Modal/Modal";
import {Divider, Input} from 'antd';


class Groups extends Component {
  state = {
    groups: [],
      showGroupJoinModal: false,
      showDeleteGroupModal: false,
      showEditGroupModal: false
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

  clickHandleForModal = type => () => {
      if(type === 'join'){
          this.setState({ showGroupJoinModal: true })
      } else if(type === 'edit'){
          this.setState({ showEditGroupModal: true })
      } else if(type === 'delete'){
          this.setState({ showDeleteGroupModal: true })
      }
  };

  joinGroup = id => () => {
      const request = {body:{userId: id.toString()}};
      axios
        .post("groups/joinGroup", request)
        .then(response => {
            console.log('join group:', response);
            if(response){
                this.setState({ showGroupJoinModal: false })
            }
        })
        .catch(error => { console.log(error) })
  };

  deleteGroup = id => () => {
      const request = {body:{userId: id.toString()}};
      axios
          .post("groups/leaveGroup", request)
          .then(response => {
              console.log('delete group:', response);
              if(response){
                  this.setState({ showDeleteGroupModal: false })
              }
          })
          .catch(error => { console.log(error) })
  };

  editGroup = obj => () => {
      const { name, description, firebaseId } = obj[0];
      const request = {body: { name: name, description: description, id: firebaseId }};
      axios
          .post("groups/fetchAndUpdate", request)
          .then(response => {
              console.log('edit group:', response);
              if(response){
                  this.setState({ showEditGroupModal: false })
              }
          })
          .catch(error => { console.log(error) })
  };

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
                    <a href="javascript:;" onClick={this.clickHandleForModal('join')}>Join</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.clickHandleForModal('edit')}>Edit</a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={this.clickHandleForModal('delete')}>Delete</a>
                </span>
        }
    ];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.groups}/>
          <CustomModal
              title="Join Group"
              visible={this.state.showGroupJoinModal}
              handleSubmit={this.joinGroup(this.state.groups.map(id => id.firebaseId))}
              handleCancel={() => {this.setState({ showGroupJoinModal: false })}}
              children={<p>Do you want to join group {this.state.groups.map(name => name.name)}?</p>}
          />
          <CustomModal
              title="Edit Group"
              visible={this.state.showEditGroupModal}
              handleSubmit={this.editGroup(this.state.groups.map(obj => obj))}
              handleCancel={() => {this.setState({ showEditGroupModal: false })}}
              children={
                  <span>
                      <p>Name</p>
                      <Input placeholder="Group Name"
                             allowClear
                             onChange={this.onTextChange}
                             defaultValue={this.state.groups.map(name => name.name)}/>
                  <p style={{ marginTop: '10px' }}>Description</p>
                  <Input placeholder="Group Description"
                         allowClear onChange={this.onTextChange}
                         defaultValue={this.state.groups.map(desc => desc.description)}/>
                  </span>}
          />
          <CustomModal
              title="Delete Group"
              visible={this.state.showDeleteGroupModal}
              handleSubmit={this.deleteGroup(this.state.groups.map(id => id.firebaseId))}
              handleCancel={() => {this.setState({ showDeleteGroupModal: false })}}
              children={<p>Are you sure you want to delete this {this.state.groups.map(name => name.name)}?</p>}
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
