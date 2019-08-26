import "antd/dist/antd.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Chat.css";

class Chat extends Component {
  render() {
    return (
      <div>
        <div id="frame">
          <div>
            <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=245fdf36-e100-496f-8e9f-4a67b086f2e9&room=DEFAULT_ROOM&iframe=true" width="100%" height="400px" scrolling="auto" allow="microphone; camera" />
            <iframe src="https://phasic-chatsvr.herokuapp.com" width="100%" height="400px" />
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
