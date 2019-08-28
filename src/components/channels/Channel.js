import React from "react";
import { API_URL } from "../../API";
import { Grid, Dropdown, Form, Container } from "semantic-ui-react";
import Message from "./Message";
import FeedContainer from "./FeedContainer";
import { connect } from "react-redux";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:4000");

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.getmessages();
  }

  state = {
    channel: {},
    typing: null
  };

  typemessage = () => {
    socket.on("typing", (user, id) => {
      if (
        user &&
        id === this.props.channel &&
        user !== this.props.user.username
      ) {
        this.setState({ typing: `${user} is typing..` });
      } else if (!user) {
        this.setState({ typing: null });
      }
    });
  };

  typingEmit = username => {
    socket.emit("typing", username, this.props.channel);
  };

  getmessages = () => {
    socket.on("posts", (posts, id) => {
      if (id === this.props.channel) {
        this.props.loadMessages(posts);
      }
    });
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

  sendMessage = () => {
    socket.emit("get messages", this.props.channel);
  };

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
            <FeedContainer messages={this.props.messages} />

            <Message
              onKeyDown={this.onKeyDown}
              channelId={this.state.channel._id}
              typemessage={this.typemessage}
              typingEmit={this.typingEmit}
              sendMessage={this.sendMessage}
            />

            <Container content={this.state.typing} />
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
