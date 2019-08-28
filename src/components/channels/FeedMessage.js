import React from "react";
import { Feed, Header } from "semantic-ui-react";
import dateFormat from "dateformat";
import { API_URL } from "../../API";

const FeedMessage = props => {
  return (
    <>
      {props.dateCreated.split("T")[0] !== props.prev && (
        <Header as="h3" textAlign="center" dividing inverted>
          {dateFormat(props.dateCreated, "dddd, d mmmm")}
        </Header>
      )}
      <Feed.Event>
        <Feed.Label>
          <img
            src={
              props.userId.avatar
                ? API_URL + "uploads/" + props.userId.avatar
                : "https://icon-library.net/images/default-user-icon/default-user-icon-13.jpg"
            }
            alt="avatar"
            style={{ width: "3em", height: "3em", objectFit: "cover" }}
          />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary style={{ color: "#fff" }}>
            <Feed.User>{props.userId.username}</Feed.User>
            <Feed.Date style={{ color: "#fff" }}>
              {props.dateCreated.split("T")[1].split(":")[0] +
                ":" +
                props.dateCreated.split("T")[1].split(":")[0]}
            </Feed.Date>
          </Feed.Summary>
          {props.content}
        </Feed.Content>
      </Feed.Event>
    </>
  );
};

export default FeedMessage;
