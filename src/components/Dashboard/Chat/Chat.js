import "antd/dist/antd.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Chat.css";
import config from '../../../config';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.subscriberProperties = {
            preferredFrameRate: 15,
            showControls: true
        };

        this.subscriberEventHandlers = {
            videoDisabled: event => {
                console.log('Subscriber video disabled!');
            },
            videoEnabled: event => {
                console.log('Subscriber video enabled!');
            }
        };
    }

    render() {
    return (
      <div>
        <div id="frame">
          <div>
            <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=245fdf36-e100-496f-8e9f-4a67b086f2e9&room=DEFAULT_ROOM&iframe=true" width="100%" height="400px" scrolling="auto" allow="microphone; camera" />
            <iframe src="https://phasic-chatsvr.herokuapp.com" width="100%" height="100%" />
          </div>
            <div>
                <OTSession apiKey={config.API_KEY} sessionId={config.SESSION_ID} token={config.TOKEN}>
                    <OTPublisher />
                    <OTStreams>
                        <OTSubscriber
                            properties={this.subscriberProperties}
                            eventHandlers={this.subscriberEventHandlers}
                        />
                    </OTStreams>
                </OTSession>
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
