import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../API";
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Header,
  Image
} from "semantic-ui-react";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    avatar: "default.jpg",
    redirect: "/channels"
  };

  componentDidMount() {}

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(API_URL + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(this.state)
    }).then(res => {
      if (res.status === 200) {
        this.props.login();
        this.props.history.push(this.state.redirect);
      }
    });
  };

  userValidation = () => {
    return fetch(API_URL + "validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    }).then(res => res.json());
  };

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

  validation = async () => {
    let errors = {};
    await this.userValidation().then(errs => {
      errors = { ...errs };
    });
    const pass = this.state.password;
    const confirmPass = this.state.confirmPassword;
    if (pass.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (pass !== confirmPass)
      errors.confirmPassword = "Passwords do not match.";
    if (!this.state.firstName) errors.firstName = "First Name required.";
    if (!this.state.lastName) errors.lastName = "Last Name required.";
    if (!this.state.username) errors.username = "Username required.";
    if (!this.state.email) errors.email = "Email required.";
    if (!this.state.avatar) errors.avatar = "Profile picture required.";
    this.setState({ errors });
  };

  displayError = field => {
    if (this.state.errors[field])
      return {
        content: this.state.errors[field]
      };
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
                error={this.displayError("firstName")}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="lastName"
                placeholder="Last Name"
                type="text"
                value={this.state.lastName}
                error={this.displayError("lastName")}
              />
              <Form.Input
                fluid
                icon="user circle"
                iconPosition="left"
                name="username"
                placeholder="Username"
                type="text"
                value={this.state.username}
                error={this.displayError("username")}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
                placeholder="Email Address"
                type="email"
                value={this.state.email}
                error={this.displayError("email")}
              />
              <Form.Input
                fluid
                icon="unlock"
                iconPosition="left"
                minlength="11"
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                error={this.displayError("password")}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                minlength="11"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={this.state.confirmPassword}
                error={this.displayError("confirmPassword")}
              />
              <Form.Input
                fluid
                type="file"
                iconPosition="left"
                icon="file image outline"
                name="imageFile"
                label="Profile Picture"
                onChange={e => this.imageUpload(e.target.files[0])}
                error={this.displayError("avatar")}
              />
              <Image
                src={API_URL + "uploads/" + this.state.avatar}
                size="small"
                circular
                avatar
                style={{ border: "4px solid #fff", marginBottom: "2em" }}
              />
              <Button
                fluid
                size="large"
                inverted
                basic
                onClick={this.validation}
              >
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
