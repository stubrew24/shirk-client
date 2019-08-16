import React from 'react';
import Channels from "./Channels";
import Channel from "./Channel";
import {Grid} from "semantic-ui-react";
import CreateChannel from "./CreateChannel";
import {API_URL} from "../../API";
import BrowseChannels from "./BrowseChannels";

export default class ChannelContainer extends React.Component {

    state = {
        channels: [],
        active: null,
        channel: null
    };

    fetchChannels = () => {
        return fetch(API_URL + 'channels')
            .then(res => res.json())
    };

    componentDidMount() {
        this.fetchChannels()
            .then(channels => this.setState({channels}))
    };

    activePanel = () => {
        switch (this.state.active) {
            case 'channel':
                return <Channel channel={this.state.channel} />;
            case 'create':
                return <CreateChannel createChannel={this.createChannel} />;
            case 'browse':
                return <BrowseChannels />
            default:
                return null;
        }
    };

    handleClick = (active, channel = null) => {
        this.setState({active, channel})
    }

    createChannel = channelObj => {
        return fetch(API_URL + 'channels', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(channelObj)
        })
            .then(res => res.json())
            .then(channel => this.setState({channels: [...this.state.channels, channel]}))
    }

    render() {
        if (this.state.channels.length === 0) return <div>Loading...</div>;
        return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Channels channels={this.state.channels} handleClick={this.handleClick} active={this.state.channel} />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            {this.activePanel()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        );
    }
}