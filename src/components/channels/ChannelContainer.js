import React from "react";
import Channels from "./Channels";
import Channel from "./Channel";
import { Segment, Grid } from "semantic-ui-react";
import CreateChannel from "./CreateChannel";
import { API_URL } from "../../API";
import BrowseChannels from "./BrowseChannels";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ChannelContainer extends React.Component {
  state = {
    active: null,
    channel: null
  };

  componentDidMount() {
    if (this.props.match.params.channelId) {
      const id = this.props.match.params.channelId;
      switch (id) {
        case "browse":
          this.setState({ active: "browse", channel: null });
          break;
        case "create":
          this.setState({ active: "create", channel: null });
          break;
        default:
          this.setState({ active: "channel", channel: id });
          break;
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.match.params.channelId !== prevProps.match.params.channelId
    ) {
      const id = this.props.match.params.channelId;
      switch (id) {
        case "browse":
          this.setState({ active: "browse", channel: null });
          break;
        case "create":
          this.setState({ active: "create", channel: null });
          break;
        default:
          this.setState({ active: "channel", channel: id });
          break;
      }
    }
  }

  activePanel = () => {
    switch (this.state.active) {
      case "channel":
        return (
          <Channel
            channel={this.state.channel}
            leaveChannel={this.leaveChannel}
          />
        );
      case "create":
        return <CreateChannel createChannel={this.createChannel} />;
      case "browse":
        return (
          <BrowseChannels
            channels={this.browseChannels()}
            joinChannel={this.joinChannel}
          />
        );
      default:
        return null;
    }
  };

  joinChannel = id => {
    fetch(API_URL + "userchannels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: this.props.user._id, channelId: id })
    })
      .then(res => res.json())
      .then(user => {
        this.props.update_user(user);
        this.props.history.push(`/channels/${id}`);
      });
  };

  browseChannels = () => {
    return this.props.allchannels.filter(
      channel =>
        !this.props.user.channels.find(
          userChannel => userChannel._id === channel._id
        )
    );
  };

  leaveChannel = id => {
    fetch(API_URL + "leavechannel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: this.props.user._id, channelId: id })
    })
      .then(res => res.json())
      .then(user => {
        this.props.update_user(user);
        this.props.history.push(`/channels`);
      });
  };

  createChannel = channelObj => {
    return fetch(API_URL + "channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(channelObj)
    })
      .then(res => res.json())
      .then(channel => this.joinChannel(channel._id));
  };

  render() {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Channels
              channels={this.props.user.channels}
              handleClick={this.handleClick}
              active={this.state.channel}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment
              style={{
                backgroundColor: "#1a1b1c",
                minHeight: "100%"
              }}
            >
              {this.activePanel()}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const msp = state => {
  return {
    user: state.user,
    allchannels: state.allchannels
  };
};

const mdp = dispatch => {
  return {
    update_user: data => dispatch({ type: "USER_AUTH", payload: data })
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelContainer)
);
