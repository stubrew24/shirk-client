import React from 'react';
import {API_URL} from "../../API";
import {Segment, List, Button} from "semantic-ui-react";

export default class BrowseChannels extends React.Component {

    state = {
        channels: []
    }

    fetchChannels = () => {
        return fetch(API_URL + 'channels')
            .then(res => res.json())
    }

    handleJoin = id => {
        fetch(API_URL + 'userchannels', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({userId: this.props.userId, channelId: id})
        })
    }

    componentDidMount() {
        this.fetchChannels()
            .then(channels => this.setState({channels}))
    }

    render() {
        return (
            <div>
                <h2>Browse Channels</h2>

                <Segment inverted>
                    <List divided inverted relaxed>
                        { this.state.channels.map(channel => {
                                return (<List.Item>
                                    <List.Content floated='right'>
                                        <Button basic inverted onClick={() => this.handleJoin(channel._id)}>Join</Button>
                                    </List.Content>
                                    <List.Content>
                                        <List.Header>{channel.name}</List.Header>
                                        {channel.description}
                                    </List.Content>
                                </List.Item>)
                            })
                        }
                    </List>
                </Segment>
            </div>
        );
    }
}