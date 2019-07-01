import React, { Component } from "react";
import { Layout } from "antd";
import 'antd/dist/antd.css';
import SideTab from "../SideTab/SideTab";
import UserProfile from "./UserProfile/UserProfile";
import Conversations from "./Conversations/Conversations";
import Groups from "./Groups/Groups";
import Files from "./Files/Files";
import Chat from "./Chat/Chat";

const { Content, Sider } = Layout;

const tabs = [
  { key: 1, title: "Profile", icon: "user", component: <UserProfile/> },
  { key: 2, title: "Conversation", icon: "message", component: <Conversations/> },
  { key: 3, title: "Groups", icon: "team", component: <Groups/> },
    { key: 4, title: "Chat", icon: "wechat", component: <Chat /> },
    { key: 5, title: "Files", icon: "file", component: <Files /> }
];

export class Dashboard extends Component {

  state = {
      currentTab: tabs[0].key,
  };
  
  handleClick = index => {
    this.setState({
      currentTab: index
    })
  };

  render() {
    const { currentTab } = this.state;
    const tabContent = tabs[currentTab-1].component;
      return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider>
              <SideTab tabs={tabs} handleClick={this.handleClick} currentTab={currentTab}/></Sider>
            <Layout>
              <Content style={{ margin: '0 20px' }}>
                {tabContent}
              </Content>
            </Layout>
          </Layout>
      )
  }
}

export default Dashboard;
