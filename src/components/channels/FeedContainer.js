import React from "react";
import FeedMessage from "./FeedMessage";
import { animateScroll } from "react-scroll";

export default class FeedContainer extends React.Component {
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "feed",
      duration: 0
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollToBottom();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.messages != nextProps.messages;
  }

  render() {
    return (
      <div
        className={"ui large feed"}
        size="large"
        id="feed"
        style={{ height: "600px", overflowY: "scroll" }}
      >
        {this.props.messages.map((message, index, arr) => (
          <FeedMessage
            prev={arr[index - 1] && arr[index - 1].dateCreated.split("T")[0]}
            key={message._id}
            {...message}
            displayDate={this.displayDate}
          />
        ))}
      </div>
    );
  }
}
