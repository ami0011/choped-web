import "antd/dist/antd.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Chat.css";

class Chat extends Component {
  render() {
    return (
      <div>
        <div id="frame">
          <div style={{ textAlign: "center", height: "100vh" }}>
            <iframe src="https://phasic-chatsvr.herokuapp.com" width="100%" height="100%" style={{ height: "-webkit-fill-available"}} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(Chat);
