import React from 'react';
import { Menu, Icon } from "antd";
import 'antd/dist/antd.css';

const SideTab = (props) => (
    <Menu style={{ width: 220, height: '100vh' }}
              defaultSelectedKeys={["1"]}
              selectedKeys={[props.currentTab.toString()]}
              mode="inline"
          >
            {props.tabs.map((tab,i) => (
                <Menu.Item 
                    key={`${tab.key}`}>
                    <div 
                        style={{ display: 'flex', justifyContent: 'left' }}
                        onClick={() => props.handleClick(tab.key)}
                        >
                    <span>
                        <Icon type={tab.icon} />
                        <span>{tab.title}</span>
                    </span>
                    </div>
                </Menu.Item>
            ))}
          </Menu>
)

export default SideTab;