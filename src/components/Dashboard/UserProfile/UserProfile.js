import React, { Component } from "react";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";
import CustomCard from "../../UI/Card/Card";
import { Skeleton, Card, Switch, Avatar } from 'antd';


const { Meta } = Card;

class UserProfile extends Component {
  state = {
      profile: [],
      loading: true
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
        this.setState({ loading: false, profile });
      })
      .catch(error => {
        console.log(error);
      });
  }

    renderCard = profile => {
        const { loading } = this.state;
      const { firstName, lastName, accountName, email, dateOfBirth, address, country, postCode} = profile;
      return(
          <div style={{ textAlign: 'left' }}>
              <Skeleton loading={loading} avatar active>
                  <Meta
                      avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={firstName + ' ' + lastName}
                  />
              <p>Account Name: <text>{accountName}</text></p>
              <p>Email: <text>{email}</text></p>
              <p>Date Of Birth: <text>{dateOfBirth}</text></p>
              <p>Address: <text>{address}</text></p>
              <p>Country: <text>{country}</text></p>
              <p>Post Code: <text>{postCode}</text></p>
              </Skeleton>
          </div>
      )
    };

  render() {
    return (
      <div>
          {this.state.profile.map(profile => (
              <CustomCard
                  title="User Profile"
                  children={this.renderCard(profile)}
              />
          ))}
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
