import { Avatar, Icon, List, message, Spin } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import reqwest from "reqwest";
import "./Chat.css";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,picture,nat&noinfo";

const chatDummyData = [
  {
    type: "replies",
    text: "When you`re backed against the wall, break the god damn thing down."
  },
  {
    type: "replies",
    text: "Excuses don`t win championships."
  },
  {
    type: "sent",
    text: "Oh yeah, did Michael Jordan tell you that?"
  },
  {
    type: "replies",
    text: "No, I told him that."
  },
  {
    type: "replies",
    text: "What are your choices when someone puts a gun to your head?"
  },
  {
    type: "sent",
    text: "What are you talking about? You do what they say or they shoot you."
  },
  {
    type: "replies",
    text:
      "Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things."
  }
];

class Chat extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    list: chatDummyData
  };
  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 20) {
      message.warning("All contacts loaded!");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };
  renderContacts = contact => {
    return (
      <div className="wrap">
        {contact && contact.status === "online" && (
          <span className="contact-status online"></span>
        )}
        {contact && contact.status === "away" && (
          <span className="contact-status away"></span>
        )}
        {contact && contact.status === "busy" && (
          <span className="contact-status busy"></span>
        )}
        <img src={contact.img} alt="" />
        <div className="meta">
          <p className="name">{contact.name}</p>
          <p className="preview">{contact.statusPreview}</p>
        </div>
      </div>
    );
  };

  renderChatContent = () => {
    let { item, list } = this.state;
    if (!item) {
      item = {
        picture: {
          thumbnail: "http://emilcarlsson.se/assets/mikeross.png"
        }
      };
    }

    return list.map((value, index) => (
      <li className={value.type} key={index}>
        <img src={item.picture.thumbnail} alt="" />
        <p>{value.text}</p>
      </li>
    ));
  };

  handleSubmitChat = text => {
    if (!text) {
      return;
    }
    this.setState({ sentText: "" });
    chatDummyData.push({
      type: "sent",
      text: text
    });

    setTimeout(() => {
      chatDummyData.push({
        type: "replies",
        text: text
      });
    }, 1000);
  };

  onChangeSearch(event) {
    const q = event.target.value.toString().toLowerCase();
    this.setState({ q }, () => this.filterList());
  }

  filterList() {
    let users = this.state.data;
    let q = this.state.q;

    users = users.filter(function(user) {
      debugger;
      return (
        user.name.first
          .toString()
          .toLowerCase()
          .indexOf(q) != -1
      ); // returns true or false
    });
    this.setState({ data: users });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div id="frame">
          <div id="sidepanel">
            <div id="profile">
              <div className="wrap">
                <img
                  id="profile-img"
                  src="http://emilcarlsson.se/assets/mikeross.png"
                  className="online"
                  alt=""
                />
                <p>Gavin C.</p>
                {/* <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
				<div id="status-options">
					<ul>
						<li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
						<li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
						<li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
						<li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
					</ul>
				</div>
				<div id="expanded">
					<label for="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="mikeross" />
					<label for="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="ross81" />
					<label for="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="mike.ross" />
				</div> */}
              </div>
            </div>
            {/* <div id="search">
			<label for=""><i className="fa fa-search" aria-hidden="true"></i></label>
			<input type="text" value={this.state.q} placeholder="Search contacts..." onChange={(e) => this.onChangeSearch(e)}/>
		</div> */}
            <div id="contacts" className="demo-infinite-container contacts">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={this.state.data}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      style={{ borderColor: "#ffa611", cursor: "pointer" }}
                      onClick={() => this.setState({ item: item })}
                    >
                      <List.Item.Meta
                        style={{ textAlign: "left" }}
                        avatar={<Avatar src={item.picture.thumbnail} />}
                        title={item.name.last}
                        description={item.email}
                      />
                      <div className="contact-status online">
                        <span className="contact-status online"></span>
                      </div>
                    </List.Item>
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
            {/* <div id="bottom-bar">
			<button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
			<button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
		</div> */}
          </div>
          <div className="content">
            <div className="contact-profile">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <p>Gavin C.</p>
              <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <i className="fa fa-twitter" aria-hidden="true"></i>
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </div>
            </div>
            <div className="messages">
              <ul>{this.renderChatContent()}</ul>
            </div>
            <div className="message-input">
              <div className="wrap">
                <input
                  type="text"
                  value={this.state.sentText ? this.state.sentText : ""}
                  placeholder="Write your message..."
                  onChange={event =>
                    this.setState({ sentText: event.target.value })
                  }
                />
                <button className="info">
                  <Icon type="tags" />
                </button>
                <button
                  className="submit"
                  onClick={() => this.handleSubmitChat(this.state.sentText)}
                >
                  <Icon type="check" />
                </button>
              </div>
            </div>
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
