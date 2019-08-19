import React from 'react'
import {Menu, Icon} from "semantic-ui-react";

export default class Channels extends React.Component {

    render(){

        return (
            <Menu vertical inverted>
                <Menu.Item>
                    <Icon name='browser' />
                    <Menu.Header onClick={() => this.props.handleClick('browse')} >Browse Channels</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Channels</Menu.Header>

                    <Menu.Menu>
                        {this.props.channels.length > 0 ?
                            this.props.channels.map((channel, index) => <Menu.Item key={index} onClick={() => this.props.handleClick('channel', channel._id)} active={this.props.active === channel._id}><Icon name='hashtag'/>{channel.name}</Menu.Item>)
                            :
                            <Menu.Item content="You haven't joined any channels." />
                        }
                         </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Icon name='plus circle' />
                    <Menu.Header onClick={() => this.props.handleClick('create')} >Create Channel</Menu.Header>
                </Menu.Item>
            </Menu>
        )
    }
}