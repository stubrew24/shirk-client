import React from "react";
import "./App.css";
import AuthContainer from "./components/auth/AuthContainer";
import Register from "./components/auth/Register";
import ChannelContainer from "./components/channels/ChannelContainer";
import withAuth from "./components/auth/withAuth";
import { Redirect, Switch, Link, Route } from "react-router-dom";
import { Container, Menu, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { API_URL } from "./API";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.userAuth();
    this.getAllChannels();
  }

  userAuth = () => {
    return fetch(API_URL + "checkAuth", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        if (resp && resp.error) return;
        this.props.userAuth(resp);
      });
  };

  getAllChannels = () => {
    fetch(API_URL + "allchannels")
      .then(res => res.json())
      .then(channels => {
        this.props.allChannels(channels);
      });
  };

  logout = () => {
    fetch(API_URL + "logout", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        this.props.userLogout();
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <Container>
        <Menu inverted stackable>
          <Menu.Item header className="mainlogo" as={Link} to={"/channels"}>
            /shirk
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            {!this.props.user._id ? (
              <Menu.Item
                name="login"
                onClick={this.handleItemClick}
                as={Link}
                to={"/login"}
              >
                Login
              </Menu.Item>
            ) : (
              <Menu.Item name="logout" onClick={this.logout}>
                Logout
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
        <Switch>
          {/*<Route path="/logout" render={routeProps => <Logout {...routeProps} logout={this.props.logout} />} />*/}
          <Route exact path="/" render={() => <Redirect to="/channels" />} />
          <Route
            path="/login"
            render={routeProps => (
              <AuthContainer {...routeProps} login={this.userAuth} />
            )}
          />
          <Route
            path="/register"
            render={routeProps => (
              <Register {...routeProps} login={this.userAuth} />
            )}
          />
          <Route
            path="/channels"
            exact
            component={withAuth(ChannelContainer)}
            userAuth={this.userAuth}
          />
          <Route
            path="/channels/:channelId"
            exact
            component={withAuth(ChannelContainer)}
            userAuth={this.userAuth}
          />
          <Route
            path="/channels/browse"
            exact
            component={withAuth(ChannelContainer)}
            userAuth={this.userAuth}
          />
          <Route
            path="/channels/create"
            exact
            component={withAuth(ChannelContainer)}
            userAuth={this.userAuth}
          />
        </Switch>
      </Container>
    );
  }
}

const msp = state => {
  return {
    user: state.user
  };
};

const mdp = dispatch => {
  return {
    userAuth: data => {
      dispatch({ type: "USER_AUTH", payload: data });
    },
    userLogout: () => {
      dispatch({ type: "LOGOUT" });
    },
    allChannels: data => {
      dispatch({ type: "ALL_CHANNELS", payload: data });
    }
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(App)
);
