import React from 'react';
import {API_URL} from "../../API";

export default class Channel extends React.Component{

    state = {
        channel: {}
    }

    fetchChannel = () => {
        fetch(API_URL + 'channels/' + this.props.channel)
            .then(res => res.json())
            .then(channel => this.setState({channel}))
    }

    componentDidMount() {
        this.fetchChannel()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.channel !== this.props.channel){
            this.fetchChannel()
        }
    }

    render(){
        return (
            <>
                <h2>{this.state.channel.name}</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur delectus molestias nihil pariatur quos rerum, sequi temporibus unde voluptates. Amet culpa enim explicabo facilis illo modi quod tempora vero!</div>
            </>
        )
    }
}