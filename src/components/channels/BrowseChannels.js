import React from "react";
import { Segment, List, Button } from "semantic-ui-react";

const BrowseChannels = props => {
  return (
    <div>
      <h2>Browse Channels</h2>

      <Segment inverted>
        <List divided inverted relaxed>
          {props.channels.length === 0 ? (
            <List.Item>No channels available.</List.Item>
          ) : null}
          {props.channels.map((channel, index) => {
            return (
              <List.Item key={index}>
                <List.Content floated="right">
                  <Button
                    basic
                    inverted
                    onClick={() => props.joinChannel(channel._id)}
                  >
                    Join
                  </Button>
                </List.Content>
                <List.Content>
                  <List.Header>{channel.name}</List.Header>
                  {channel.description}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Segment>
    </div>
  );
};

export default BrowseChannels;
