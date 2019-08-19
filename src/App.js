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

class App extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            activeItem: null
        }
        this.userAuth()

    }

    userAuth = () => {
        return fetch(API_URL + 'checkAuth', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(this.props.userAuth)
    }

    logout = () => {
        fetch(API_URL + 'logout', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(this.props.userLogout)
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {

        const { activeItem } = this.state;

        return (
            <Container>
                <Menu inverted>
                    <Menu.Item header>SHIRK</Menu.Item>
                    { !this.props.user._id ?
                        <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick} as={Link} to={'/login'}>Login</Menu.Item>
                        :
                        <Menu.Item name="logout" onClick={this.logout}>Logout</Menu.Item>
                    }
                    <Menu.Item name="posts" active={activeItem === 'posts'} onClick={this.handleItemClick} as={Link} to={'/posts'}>Posts</Menu.Item>
                    <Menu.Item name="channels" active={activeItem === 'channels'} onClick={this.handleItemClick} as={Link} to={'/channels'}>Channels</Menu.Item>

                </Menu>
                <Switch>
                    {/*<Route path="/logout" render={routeProps => <Logout {...routeProps} logout={this.props.logout} />} />*/}
                    <Route path="/login" render={routeProps => <AuthContainer {...routeProps} login={this.userAuth} />} />
                    <Route path="/posts" component={withAuth(PostContainer)} />
                    <Route path="/channels" component={withAuth(ChannelContainer)} />
                </Switch>
            </Container>
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
        userAuth: data => {dispatch({type: 'USER_AUTH', payload: data})},
        userLogout: () => {dispatch({type: 'LOGOUT'})}
    }
}

export default connect(msp, mdp)(App);
