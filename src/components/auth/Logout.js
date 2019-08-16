import React from 'react'
import {API_URL} from "../../API";

export default class Logout extends React.Component {

    componentDidMount(){
        fetch(API_URL + 'logout', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(this.props.logout)
    }

    render(){
        return(
            <></>
        )
    }

}