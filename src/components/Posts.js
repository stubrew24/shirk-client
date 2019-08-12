import React from 'react'
import Post from './Post'

export default class Posts extends React.Component {
    render() {
        return (
            <div>
                {this.props.posts.map((post, index) => <Post key={index} post={post}/>)}
            </div>
        );
    }
}