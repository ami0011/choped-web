import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import * as actions from './store/actions'

import "./App.css";
import Layout from "./components/UI/Layout/Layout";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Logout  from "./components/Logout/Logout";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserProfile from "./components/Dashboard/UserProfile/UserProfile";
import Groups from "./components/Dashboard/Groups/Groups";
import Conversations from "./components/Dashboard/Conversations/Conversations";
import Files from "./components/Dashboard/Files/Files";
import Chat from "./components/Dashboard/Chat/Chat.js";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/signin" component={Signin} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route path="/signin" component={Signin} />
            <Route path="/user" component={UserProfile}/>
            <Route path="/groups" component={Groups}/>
            <Route path="/conversations" component={Conversations}/>
            <Route path="/files" component={Files}/>
            <Route path="/chat" component={Chat}/>
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
