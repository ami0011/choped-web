import React, { Component } from "react";
import axios from "../../../axiosInstance";
import Table from "../../UI/Table/Table";
import { connect } from "react-redux";

class UserProfile extends Component {
  state = {
    profile: []
  };

  componentWillMount() {
    axios
      .get(`/users/${this.props.userId}`)
      .then(response => {
        const profile = [{
          ...response.data,
          key: response.data.userId,
          dateOfBirth: `${new Date(
            response.data.dateOfBirth
          ).getFullYear()}-${new Date(
            response.data.dateOfBirth
          ).getMonth()}-${new Date(response.data.dateOfBirth).getDate()}`
        }];
        this.setState({ profile });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const columns = [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName"
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName"
      },
      {
        title: "Account Name",
        dataIndex: "accountName",
        key: "accountName"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Date Of Birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country"
      },
      {
        title: "Post Code",
        dataIndex: "postCode",
        key: "postCode"
      }
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.profile} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(UserProfile);
