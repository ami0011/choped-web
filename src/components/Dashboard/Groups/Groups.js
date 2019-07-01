import React, { Component } from "react";
import axios from "../../../axiosInstance";
import Table from "../../UI/Table/Table";
import { connect } from "react-redux";
import CustomModal from "../../UI/Modal/Modal";
import {Divider, Input, Button, Checkbox} from 'antd';


class Groups extends Component {
  state = {
    groups: [],
      lists: [],
      showGroupJoinModal: false,
      showDeleteGroupModal: false,
      showEditGroupModal: false,
      showAddGroupModal: false,
      selectedRecord: { name: '', description: '' },
      showAdd: false,
      showJoin: false,
      checked: false
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

  onJoinGroups = () => {
      axios
          .get(`/groups/list/${this.props.userId}`)
          .then(response => {
              const lists = response.data.map(list => {
                  return {
                      ...list,
                      members: list.members.length,
                      startDate: `${new Date(list.startDate).getFullYear()}-${new Date(
                          list.startDate
                      ).getMonth()}-${new Date(list.startDate).getDate()}`,
                      key: list.firebaseId
                  };
              });
              this.setState({ lists,  });
          })
          .catch(error => {
              console.log(error);
          });
  };

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
      const { selectedRecord } = this.state;
      const request = {body:{userId: this.props.userId, firebaseId: selectedRecord.firebaseId}};
      axios
        .post("/groups/joinGroup", request)
        .then(response => {
            if(response){
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
                this.setState({ showGroupJoinModal: false, selectedRecord: { name: '', description: '' } })
            }
        })
        .catch(error => { console.log(error) })
  };

  deleteGroup = () => {
      const { selectedRecord } = this.state;
      const request = {body:{userId: this.props.userId, firebaseId: selectedRecord.firebaseId}};
      axios
          .post("groups/leaveGroup", request)
          .then(response => {
              if(response){
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
              if(response){
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
                  this.setState({ showEditGroupModal: false });
              }
          })
          .catch(error => { console.log(error) })
  };

  addGroup = () => {
      this.setState({ showAddGroupModal: false });
  };

  onTextChange = event => {
      const { value, id } = event.target;

      if(id === 'name'){
          this.setState({ ...this.state, selectedRecord: { ...this.state.selectedRecord, name : value}})
      } else if ( id === 'description' ){
          this.setState({ ...this.state, selectedRecord: { ...this.state.selectedRecord, description : value}})
      }
  };

    renderPlusClick = () => {
        this.setState({ showAdd: !this.state.showAdd, showJoin: !this.state.showJoin })
    };

    showGroupsModal = () => {
        this.onJoinGroups();
        this.setState({ showGroupJoinModal: true })
    };

    onCheck = event => {
      this.setState({ selectedRecord: event.target.value, checked: event.target.checked })
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
            title: "Public/Private",
            dataIndex: "",
            key: ""
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record) =>
                    <span>
                        {/*<a href="javascript:;" onClick={this.clickHandleForModal('join', record)}>Join</a>*/}
                        {/*<Divider type="vertical"/>*/}
                        <a href="javascript:;" onClick={this.clickHandleForModal('edit', record)}>Edit</a>
                        <Divider type="vertical"/>
                        <a href="javascript:;" onClick={this.clickHandleForModal('delete', record)}>Leave</a>
                    </span>}
    ];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.groups}/>
          <CustomModal
              title="Join Group/s"
              visible={this.state.showGroupJoinModal}
              handleSubmit={this.joinGroup}
              okButtonProps={{ disabled: !this.state.checked }}
              handleCancel={() => {this.setState({ showGroupJoinModal: false, selectedRecord: { name: '', description: '' } })}}
              children={this.state.lists.map((group, index) => (
                  <Checkbox
                      key={index}
                      value={group}
                      checked={this.state.selectedRecord.name === group.name && this.state.checked}
                      onChange={this.onCheck}>{group.name}</Checkbox>
              ))}
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
              title="Add Group"
              visible={this.state.showAddGroupModal}
              handleSubmit={this.addGroup}
              handleCancel={() => {this.setState({ showAddGroupModal: false })}}
              okButtonProps={{ disabled: !this.state.selectedRecord.name }}
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
              children={<p>Are you sure you want to leave group {this.state.selectedRecord.name}?</p>}
          />
          <Button type={'primary'} shape={'circle'} icon={'plus'} style={this.state.showAdd ? { float: 'right', margin: '30px', transform: 'rotate(45deg)'} : { float: 'right', margin: '30px'}} onClick={this.renderPlusClick}/>
          {this.state.showAdd && (
              <Button
                  type={'primary'}
                  shape={'round'}
                  style={{ float: 'right', marginTop: '30px'}}
                  onClick={() => {this.setState({ showAddGroupModal: true })}}
              >Add Group
              </Button>
          )}
          {this.state.showJoin && (
              <Button
                  type={'primary'}
                  shape={'round'}
                  style={{ float: 'right', marginTop: '30px', marginRight: '10px'}}
                  onClick={this.showGroupsModal}
              >
                  Join Group
              </Button>
          )}
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
