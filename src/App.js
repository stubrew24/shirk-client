import React from 'react';
import './App.css';
import PostContainer from './components/posts/PostContainer'
import AuthContainer from "./components/auth/AuthContainer";
import ChannelContainer from "./components/channels/ChannelContainer";
import withAuth from './components/auth/withAuth'
import { Switch, Link, Route } from "react-router-dom";
import {Container, Menu} from "semantic-ui-react";
import { connect } from 'react-redux'

import {API_URL} from "./API";
import Logout from "./components/auth/Logout";

class App extends React.Component {



    constructor (props) {
        super(props)
        this.state = {
            activeItem: null,
            loggedIn: false
        }

        fetch(API_URL + 'checkAuth', {
            credentials: 'include'
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ loggedIn: true });
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ loggedIn: false });
            });
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout = () => this.setState({loggedIn: false})

    login = () => this.setState({loggedIn: true})

    render() {

        const { activeItem } = this.state;

        return (
            <Container>
                <Menu inverted>
                    <Menu.Item header>SHIRK</Menu.Item>
                    { !this.state.loggedIn ?
                        <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick} as={Link} to={'/login'}>Login</Menu.Item>
                        :
                        <Menu.Item name="logout" onClick={this.handleItemClick} as={Link} to={'/logout'}>Logout</Menu.Item>
                    }
                    <Menu.Item name="posts" active={activeItem === 'posts'} onClick={this.handleItemClick} as={Link} to={'/posts'}>Posts</Menu.Item>
                    <Menu.Item name="channels" active={activeItem === 'channels'} onClick={this.handleItemClick} as={Link} to={'/channels'}>Channels</Menu.Item>

                    <Menu.Item onClick={() => this.props.add_state('meh')}>Add To State</Menu.Item>

                </Menu>
                <Switch>
                    <Route path="/logout" render={routeProps => <Logout {...routeProps} logout={this.logout} />} />
                    <Route path="/login" render={routeProps => <AuthContainer {...routeProps} login={this.login} />} />
                    <Route path="/posts" component={withAuth(PostContainer)} />
                    <Route path="/channels" component={withAuth(ChannelContainer)} />
                </Switch>
            </Container>
        );
    }
}

const msp = state => {
    return {
        arr: state
    }
}

const mdp = dispatch => {
    return {
        user_auth: data => {dispatch({type: 'USER_AUTH', payload: data})}
    }
}

export default connect(msp, mdp)(App);
