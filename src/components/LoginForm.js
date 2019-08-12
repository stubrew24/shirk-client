import React from 'react';

export default class LoginForm extends React.Component{

    state = {
        username: "",
        password: ""
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
            .then(resp => resp.json())
            .then(console.log)

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <input type={"text"} name={"username"} placeholder={"username"} value={this.state.username}/> <br />
                    <input type={"password"} name={"password"} placeholder={"password"} value={this.state.password}/> <br />
                    <input type={"submit"} />
                </form>
            </div>
        )
    }
}