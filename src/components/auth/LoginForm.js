import React from 'react';
import { withRouter } from "react-router-dom";
import {API_URL} from "../../API";

class LoginForm extends React.Component{

    state = {
        username: "",
        password: "",
        message: "",
        redirect: "/"
    }

    componentDidMount() {
        if (this.props.location.state){
            const redirect = this.props.location.state.path
            this.setState({redirect})
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch(API_URL + 'login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(this.state)
        })
            .then(res => {
                if(res.status === 200) {
                    this.props.login();
                    this.props.history.push(this.state.redirect);
                }
            })

    }

    render() {

        return (

            <div>

                {this.props.location.state ? this.props.location.state.message : null}
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <input type={"text"} name={"username"} placeholder={"username"} value={this.state.username}/> <br />
                    <input type={"password"} name={"password"} placeholder={"password"} value={this.state.password}/> <br />
                    <input type={"submit"} />
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm)