import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Channels extends React.Component {
  render() {
    return (
      <Menu vertical inverted fluid>
        <Menu.Item>
          <Icon name="browser" />
          <Menu.Header as={Link} to={"/channels/browse"}>
            Browse Channels
          </Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Channels</Menu.Header>

          <Menu.Menu>
            {this.props.channels && this.props.channels.length > 0 ? (
              this.props.channels.map((channel, index) => (
                <Menu.Item
                  key={index}
                  as={Link}
                  to={`/channels/${channel._id}`}
                  active={this.props.active === channel._id}
                >
                  <Icon name="hashtag" />
                  {channel.name}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item content="You haven't joined any channels." />
            )}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Icon name="plus circle" />
          <Menu.Header as={Link} to={"/channels/create"}>
            Create Channel
          </Menu.Header>
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(state => ({ allchannels: state.allchannels }))(Channels);
