import React from "react";
import { Form, Grid, Button, Select } from "semantic-ui-react";

const options = [
  { key: "p", text: "Public", value: "public" },
  { key: "h", text: "Private", value: "private" }
];

export default class CreateChannel extends React.Component {
  state = {
    name: "",
    description: "",
    visibility: "public"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createChannel(this.state);
    this.setState({ name: "", description: "", visibility: "public" });
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <h2>Create Channel</h2>
            <Form inverted onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Channel Name</label>
                <input
                  placeholder={"Channel Name"}
                  name={"name"}
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input
                  placeholder={"Description"}
                  name={"description"}
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field
                control={Select}
                label="Visibility"
                options={options}
                name="visibility"
                placeholder="Visibility"
                value={this.state.visibility}
                onChange={(e, { value }) =>
                  this.setState({ visibility: value })
                }
              />
              <Form.Field>
                <Button type="submit" floated="right" inverted basic>
                  Create Channel
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
