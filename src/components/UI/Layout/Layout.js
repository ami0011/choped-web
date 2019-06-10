import React, { Component } from "react";
import { connect } from "react-redux";

import "./Layout.css";
import Toolbar from "../Toolbar/Toolbar";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar isAuth={this.props.isAuthenticated} />
        <main className="Content">{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
