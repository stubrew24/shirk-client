import React from 'react'
import {Form, TextArea} from "semantic-ui-react";
import { connect } from 'react-redux'
import {API_URL} from "../../API";


class Message extends React.Component{

  constructor(props) {
    super(props)
    this.props.typemessage()
  }

  state = {
    channelId: null,
    userId: null,
    content: '',
    dateCreated: null
  }

  componentDidMount() {
    this.setState({
      channelId: this.props.channelId,
      userId: this.props.user._id,
      dateCreated: null,
      content: ''
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.channelId !== this.props.channelId){
        this.setState({
          channelId: this.props.channelId
        })
      }
      if (this.props.content){
        this.setState({content: this.props.content})
      }
  }

  handleChange = e => {
    this.props.typingEmit(this.props.user.username)
    this.setState({content: e.target.value})
  }

  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.onSubmit();
    }
  };

  onSubmit = () => {
    fetch(API_URL + "posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...this.state, dateCreated: new Date()})
    })
      .then(res => res.json())
      .then(msg => {
        this.props.sendMessage()
        this.setState({content: '', dateCreated: null})
      });
  };

  render() {
    return (
      <Form>
        <Form.Field
          onChange={this.handleChange}
          onKeyDown={this.onKeyDown}
          id="form-textarea-control-opinion"
          control={TextArea}
          placeholder={"Message #"}
          value={this.state.content}
        />
      </Form>
    );
  }
}

const msp = state => {
  return {
    user: state.user
  }
}

const mdp = dispatch => {
  return {
    pushMessage: data => dispatch({type: 'PUSH_MESSAGE', payload: data})
  }
}

export default connect(msp, mdp)(Message)
