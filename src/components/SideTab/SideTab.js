import React from 'react';
import { Menu, Icon } from "antd";
import 'antd/dist/antd.css';

const { SubMenu } = Menu;



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
                    <Icon type={tab.icon} />{tab.title}
                </Menu.Item>
            ))}
          </Menu>
)

export default SideTab;