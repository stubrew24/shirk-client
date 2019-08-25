import React from "react";
import FeedMessage from "./FeedMessage";
import { animateScroll } from "react-scroll";

export default class FeedContainer extends React.Component {
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "feed"
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollToBottom();
  }

  timeBetween = (compDate, today = new Date()) => {
    const compDateMS = new Date(compDate).getTime();
    const todayMS = today.getTime();
    return todayMS - compDateMS;
  };

  formatDate = date => {
    const d = date.split("T");
    const arr = d[0].split("-");
    return `${arr[2]}-${arr[1]}-${arr[0]}`;
  };

  displayDate = date => {
    const ms = this.timeBetween(date);
    switch (true) {
      case ms < 1000 * 60:
        return `${(ms / 1000).toFixed()} seconds ago`;
      case ms < 1000 * 60 * 60:
        return `${(ms / (1000 * 60)).toFixed()} minutes ago`;

      case ms < 1000 * 60 * 60 * 24:
        return `${(ms / (1000 * 60 * 60)).toFixed()} hours ago`;

      case ms < 1000 * 60 * 60 * 24 * 7:
        return `${(ms / (1000 * 60 * 60 * 24)).toFixed()} days ago`;

      default:
        return `${this.formatDate(date)}`;
    }
  };

  render() {
    return (
      <div
        className={"ui large feed"}
        size="large"
        id="feed"
        style={{ height: "600px", overflowY: "scroll" }}
      >
        {this.props.messages.map(message => (
          <FeedMessage
            key={message._id}
            {...message}
            displayDate={this.displayDate}
          />
        ))}
      </div>
    );
  }
}
