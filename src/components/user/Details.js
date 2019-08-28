import React from "react";
import { API_URL } from "../../API";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Image,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";

let message = null;

class Details extends React.Component {
  state = {
    username: "",
    avatar: null,
    message: false
  };

  componentDidMount() {
    this.setState({
      username: this.props.user.username,
      avatar: this.props.user.avatar
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({
        username: this.props.user.username,
        avatar: this.props.user.avatar
      });
    }
  }

  imageUpload = file => {
    const data = new FormData();
    data.append("avatar", file);
    fetch(API_URL + "uploadavatar", {
      method: "POST",
      credentials: "include",
      body: data
    })
      .then(res => res.json())
      .then(resp => this.setState({ avatar: resp.avatar }));
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(API_URL + "users/" + this.props.user._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(user => {
        message = "Details updated.";
        this.props.updateUser(user);
      });
  };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "60vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {message && <Message positive>{message}</Message>}
          <Form size="large" inverted onSubmit={this.handleSubmit}>
            <Segment stacked inverted>
              <Header inverted>Update Details</Header>
              <Image
                src={API_URL + "uploads/" + this.state.avatar}
                size="small"
                circular
                avatar
                style={{ border: "4px solid #fff", marginBottom: "2em" }}
              />
              <Form.Input
                fluid
                icon="user circle"
                iconPosition="left"
                name="username"
                placeholder="Username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                type="file"
                iconPosition="left"
                icon="file image outline"
                name="imageFile"
                onChange={e => this.imageUpload(e.target.files[0])}
              />
              <Button fluid size="large" inverted basic>
                Update
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const msp = state => {
  return {
    user: state.user
  };
};

const mdp = dispatch => {
  return {
    updateUser: data => dispatch({ type: "UPDATE_USER", payload: data })
  };
};

export default connect(
  msp,
  mdp
)(Details);
