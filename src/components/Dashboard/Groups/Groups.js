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
      showEditGroupModal: false,
      selectedRecord: { name: '', description: '' }
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

  clickHandleForModal = (type, group) => () => {
      if(type === 'join'){
          this.setState({ showGroupJoinModal: true, selectedRecord:group })
      } else if(type === 'edit'){
          this.setState({ showEditGroupModal: true, selectedRecord: group})
      } else if(type === 'delete'){
          this.setState({ showDeleteGroupModal: true, selectedRecord: group })
      }
  };

  joinGroup = () => {
      const request = {body:{userId: this.props.userId}};
      axios
        .post("/groups/joinGroup", request)
        .then(response => {
            const { data } = response;
            this.setState({ groups: [data] });
            if(response){
                this.setState({ showGroupJoinModal: false })
            }
        })
        .catch(error => { console.log(error) })
  };

  deleteGroup = () => {
      const request = {body:{userId: this.props.userId}};
      axios
          .post("groups/leaveGroup", request)
          .then(response => {
              const { data } = response;
              this.setState({ groups: [data] });
              if(response){
                  this.setState({ showDeleteGroupModal: false })
              }
          })
          .catch(error => { console.log(error) })
  };

  editGroup = () => {
      const { firebaseId, name, description } = this.state.selectedRecord;
      const request = {body: { name: name, description: description, id: firebaseId }};
      axios
          .post("groups/fetchAndUpdate", request)
          .then(response => {
              const { data } = response;
              this.setState({ groups: [data] });
              if(response){
                  this.setState({ showEditGroupModal: false })
              }
          })
          .catch(error => { console.log(error) })
  };

  onTextChange = event => {
      const { value, id } = event.target;

      if(id === 'name'){
          this.setState({ ...this.state, selectedRecord: { ...this.state.selectedRecord, name : value}})
      } else if ( id === 'description' ){
          this.setState({ ...this.state, selectedRecord: { ...this.state.selectedRecord, description : value}})
      }
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
            render: text =>
                this.state.groups.map(group =>
                    <span>
                        <a href="javascript:;" onClick={this.clickHandleForModal('join', group)}>Join</a>
                        <Divider type="vertical"/>
                        <a href="javascript:;" onClick={this.clickHandleForModal('edit', group)}>Edit</a>
                    <Divider type="vertical"/>
                    <a href="javascript:;" onClick={this.clickHandleForModal('delete', group)}>Leave</a>
                    </span>
                )}
    ];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.groups}/>
          <CustomModal
              title="Join Group"
              visible={this.state.showGroupJoinModal}
              handleSubmit={this.joinGroup}
              handleCancel={() => {this.setState({ showGroupJoinModal: false })}}
              children={<p>Do you want to join group {this.state.selectedRecord.name}?</p>}
          />
          <CustomModal
              title="Edit Group"
              visible={this.state.showEditGroupModal}
              handleSubmit={this.editGroup}
              handleCancel={() => {this.setState({ showEditGroupModal: false })}}
              children={
                  <span>
                      <p>Name</p>
                      <Input placeholder="Group Name"
                             id="name"
                             allowClear
                             onChange={this.onTextChange}
                             value={this.state.selectedRecord.name}
                      />
                  <p style={{ marginTop: '10px' }}>Description</p>
                  <Input placeholder="Group Description"
                         id="description"
                         allowClear
                         onChange={this.onTextChange}
                         value={this.state.selectedRecord.description}
                  />
                  </span>}
          />
          <CustomModal
              title="Delete Group"
              visible={this.state.showDeleteGroupModal}
              handleSubmit={this.deleteGroup}
              handleCancel={() => {this.setState({ showDeleteGroupModal: false })}}
              children={<p>Are you sure you want to delete this {this.state.selectedRecord.name}?</p>}
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
