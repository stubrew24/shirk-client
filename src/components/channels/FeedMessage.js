import React from "react";
import { Feed, Icon } from "semantic-ui-react";

const FeedMessage = props => {
  return (
    <Feed.Event>
      <Feed.Label>
        <img
          src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
          alt="avatar"
        />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary style={{ color: "#fff" }}>
          <Feed.User>Elliot Fu</Feed.User>
          <Feed.Date style={{ color: "#fff" }}>
            {props.displayDate(props.dateCreated)}
          </Feed.Date>
        </Feed.Summary>
        {props.content}
        <Feed.Extra>
          <Feed.Like style={{ color: "#fff" }}>
            <Icon name="like" />4 Likes
          </Feed.Like>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FeedMessage;
