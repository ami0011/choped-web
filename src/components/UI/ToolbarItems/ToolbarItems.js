import React, { Component } from "react";
import ToolbarItem from "./ToolbarItem/ToolbarItem";

import "./ToolbarItems.css";

export class ToolbarItems extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <ul className="NavigationItems">
        <ToolbarItem link="/" exact>
          Dr Galen’s
        </ToolbarItem>
        {isAuthenticated ? (
          <ToolbarItem link="/dashboard">Dashboard</ToolbarItem>
        ) : null}
        {!isAuthenticated ? (
          <ToolbarItem link="/signin">Login</ToolbarItem>
        ) : (
            <ToolbarItem link="/logout">Logout</ToolbarItem>
        )}
      </ul>
    );
  }
}

export default ToolbarItems;
