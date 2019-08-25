import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {API_URL} from "../../API";

export default function withAuth(ComponentToProtect) {

    return class extends Component {
        state = {
            loading: true,
            redirect: false,
        };

        componentDidMount() {
            fetch(API_URL + 'checkAuth', {
                credentials: 'include'
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to={{pathname: '/login', state: {message: 'You must be logged in to view this page.', path: this.props.location.pathname}}} />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}
