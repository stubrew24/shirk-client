import React from 'react'

export default class PostForm extends React.Component {

    state = {
        content: "",
        userId: '5d51745a83e77a7d2a00cd96',
        dateCreated: Date()
    }

    handleChange = e => {
        this.setState({content: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.createPost(this.state)
        this.setState({content: ""})
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <p>
                        <label>Content</label><br />
                        <input type={"text"} name={"content"} value={this.state.content} onChange={this.handleChange} />
                    </p>
                    <input type={"submit"} />
                </form>
            </div>
        )
    }
}