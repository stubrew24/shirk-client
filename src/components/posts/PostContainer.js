import React from 'react'
import PostForm from './PostForm'
import Posts from './Posts'
import {API_URL} from "../../API";

export default class PostContainer extends React.Component {

    state = {
        posts: []
    };

    fetchPosts = () => {
        return fetch(API_URL + 'posts')
            .then(resp => resp.json())
    };

    componentDidMount() {
        this.fetchPosts()
            .then(posts => this.setState({posts}))
    }

    createPost = post => {
        fetch(API_URL + 'posts', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(post)
        })
            .then(resp => resp.json())
            .then(post => this.setState({posts: [post, ...this.state.posts]}))
    }

    render() {
        return (
            <div>
                <PostForm createPost={this.createPost}/>
                <Posts posts={this.state.posts} />
            </div>
        )
    }
}