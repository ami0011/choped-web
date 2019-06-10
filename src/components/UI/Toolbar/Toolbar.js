import React, { Component } from "react";

import "./Toolbar.css";

import Logo from "../ToolbarItems/Logo/Logo";
import ToolbarItems from "../ToolbarItems/ToolbarItems";

export class Toolbar extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <header className="Toolbar">
        <div className="Toolbar_Logo">
          <Logo />
        </div>
        <nav className="DesktopOnly">
          <ToolbarItems isAuthenticated={isAuth} />
        </nav>
      </header>
    );
  }
}

export default Toolbar;
