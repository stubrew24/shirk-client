import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../API";
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Header
} from "semantic-ui-react";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
    imagefile: null,
    redirect: "/channels"
  };

  componentDidMount() {}

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("avatar", this.state.imagefile);
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("username", this.state.username);
    data.append("email", this.state.email);
    data.append("password", this.state.password);

    fetch(API_URL + "register", {
      method: "POST",
      credentials: "include",
      body: data
    }).then(res => {
      if (res.status === 200) {
        this.props.login();
        this.props.history.push(this.state.redirect);
      }
    });
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "60vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.props.location.state ? (
            <Message negative>
              <Message.Header>
                {this.props.location.state.message}
              </Message.Header>
            </Message>
          ) : null}
          <Form
            size="large"
            inverted
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            enctype="multipart/form-data"
          >
            <Header inverted>Sign Up</Header>
            <Segment stacked inverted>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="firstName"
                placeholder="First Name"
                type="text"
                value={this.state.firstName}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="lastName"
                placeholder="Last Name"
                type="text"
                value={this.state.lastName}
              />
              <Form.Input
                fluid
                icon="user circle"
                iconPosition="left"
                name="username"
                placeholder="Username"
                type="text"
                value={this.state.username}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
                placeholder="Email Address"
                type="text"
                value={this.state.email}
              />
              <Form.Input
                fluid
                icon="unlock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={this.state.confirmPassword}
              />
              <Form.Input
                fluid
                type="file"
                iconPosition="left"
                icon="file image outline"
                name="imageFile"
                onChange={e => this.setState({ imagefile: e.target.files[0] })}
              />
              <Button fluid size="large" inverted basic>
                Register
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Register);
