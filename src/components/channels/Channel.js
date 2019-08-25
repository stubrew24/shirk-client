import React from "react";
import { API_URL } from "../../API";
import { Grid, Dropdown } from "semantic-ui-react";
import Message from "./Message";
import FeedContainer from "./FeedContainer";
import { connect } from "react-redux";

class Channel extends React.Component {
  state = {
    channel: {}
  };

  fetchChannel = () => {
    fetch(API_URL + "channels/" + this.props.channel)
      .then(res => res.json())
      .then(channel => {
        this.fetchMessages(channel._id);
        this.setState({ channel });
      });
  };

  fetchMessages = id => {
    fetch(API_URL + "posts/" + id)
      .then(res => res.json())
      .then(this.props.loadMessages);
  };

  componentDidMount() {
    this.fetchChannel();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.channel !== this.props.channel) {
      this.fetchChannel();
    }
  }

  render() {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={15}>
            <h2>{this.state.channel.name}</h2>
          </Grid.Column>
          <Grid.Column width={1}>
            <Dropdown
              icon="setting"
              direction={"left"}
              style={{ fontSize: "18px" }}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Leave Channel"
                  onClick={() => this.props.leaveChannel(this.props.channel)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <FeedContainer
              messages={this.props.messages.slice(
                this.props.messages.length - 10,
                this.props.messages.length
              )}
            />

            <Message
              onKeyDown={this.onKeyDown}
              channelId={this.state.channel._id}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const msp = state => {
  return {
    user: state.user,
    messages: state.messages
  };
};

const mdp = dispatch => {
  return {
    loadMessages: data => dispatch({ type: "LOAD_MESSAGES", payload: data })
  };
};

export default connect(
  msp,
  mdp
)(Channel);
