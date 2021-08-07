import React, { Component } from 'react'

class PostList extends Component {

  render() {
    return (
      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.addPost(this.post.value)
        }}>
          <input id="newPost" ref={(input) => this.post = input} type="text" className="form-control" placeholder="Add post..." required />
          <input type="submit" />
        </form>
        <ul id="postList" className="list-unstyled">
          { this.props.posts.map((post, key) => {
            if (post.text !== "") {
              return(
                <div className="postTemplate checkbox" key={key}>
                  <label>
                    <input 
                      type="checkbox"
                      name={post.id}
                      ref={(input) => {
                        this.checkbox = input
                      }}
                      onClick={(event) => {
                        this.props.deletePost(event.target.name)
                      }} />
                    <span className="content">{post.text}</span>
                  </label>
                </div>
              )
            }
            return null;
          })}
        </ul>
      </div>
    );
  }
}

export default PostList;