import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./ToolbarItem.css";

export class ToolbarItem extends Component {
  render() {
    const { link, exact, children } = this.props;
    return (
      <li className="NavigationItem">
        <NavLink to={link} exact={exact} activeClassName="active">
          {children}
        </NavLink>
      </li>
    );
  }
}

export default ToolbarItem;
