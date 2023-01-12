import React, { Component } from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:5000"
// const fetchTasks = async () => {
//     const data = await.axios.get(`${baseUrl}/products`)
//     console.logs(data)
// }

class Readers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get(`${baseUrl}/products`)
            .then(res => {
                this.setState({ posts: res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { posts } = this.state
        return (
        <div>
            <h1>test  </h1>
            <h2>{console.log("this.state", this.state)}</h2>
            <h2>{console.log("posts", posts)}</h2>
            <h2>{console.log("posts.length", posts.length)}</h2>
            {
                posts.length ?
                    posts.map(post =>
                        <div key={post} className="ListItem">
                            {post}
                        </div>) :
                null
            }
        </div>
        )
    }
}
export default Readers
