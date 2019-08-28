import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../API";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    redirect: "/channels"
  };

  componentDidMount() {
    if (this.props.location.state) {
      const redirect = this.props.location.state.path;
      this.setState({ redirect });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(API_URL + "login", {
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

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form
            size="large"
            inverted
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          >
            <Header inverted>Sign In</Header>
            <Segment stacked inverted>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="Username"
                type="text"
                value={this.state.username}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
              />

              <Button fluid size="large" inverted basic>
                Login
              </Button>
            </Segment>
          </Form>
          <Message color="black">
            New here? <Link to={"/register"}>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(LoginForm);
