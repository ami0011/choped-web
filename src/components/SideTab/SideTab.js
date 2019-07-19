import React from 'react';
import { Menu, Icon } from "antd";
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';

const SideTab = (props) => (
    <Menu style={{ width: 220, height: '100vh' }}
              defaultSelectedKeys={["1"]}
              selectedKeys={[props.currentTab.toString()]}
              mode="inline"
          >
            {props.tabs.map((tab,i) => (
                <Menu.Item
                    key={`${tab.key}`}
                    onClick={() => props.handleClick(tab.key)}>
                    <NavLink to={`/dashboard/${tab.redirectTo}`}><Icon type={tab.icon} />{tab.title}</NavLink>
                </Menu.Item>
            ))}
          </Menu>
)

export default SideTab;