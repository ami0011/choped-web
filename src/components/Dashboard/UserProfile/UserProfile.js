import React, {Component} from "react";
import axios from "../../../axiosInstance";
import {connect} from "react-redux";
import CustomCard from "../../UI/Card/Card";
import {Avatar, Card, Skeleton, Button, Icon} from 'antd';
const {Meta} = Card;

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
                this.setState({loading: false, profile});
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderCard = profile => {
        const {loading} = this.state;
        const {firstName, lastName, accountName, email, dateOfBirth, address, country, postCode, type, gender, mobile, account} = profile;
        return (
            <div style={{textAlign: 'left'}}>
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                        }
                        title={firstName + ' ' + lastName}
                    />
                    <p>Account Name: <text>{accountName}</text></p>
                    <p>Email: <text>{email}</text></p>
                    <p>Date Of Birth: <text>{dateOfBirth}</text></p>
                    <p>Address: <text>{address}</text></p>
                    <p>Country: <text>{country}</text></p>
                    <p>Post Code: <text>{postCode}</text></p>
                    <p>User Type: <text>{type}</text></p>
                    <p>Gender: <text>{gender}</text></p>
                    <p>Mobile No.: <text>{mobile}</text></p>
                    <p>Accounts: <text>{account}</text></p>
                </Skeleton>
                <div className="icons-list" style={{textAlign: 'center'}}>
                    <Button type="primary" shape="circle" icon="facebook" size={20} style={{margin: 5}}/>
                    <Button type="primary" shape="circle" icon="instagram" size={20} style={{margin: 5}}/>
                    <Button type="primary" shape="circle" icon="twitter" size={20} style={{margin: 5}}/>
                    <Button type="primary" shape="circle" icon="google" size={20} style={{margin: 5}}/>
                </div>
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
