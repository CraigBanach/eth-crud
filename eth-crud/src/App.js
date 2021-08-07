import React, { Component } from 'react'
import Web3 from 'web3'
import { CRUD_ABI, CRUD_ADDRESS } from './config'
import PostList from './PostList'
import './App.css'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const crud = new web3.eth.Contract(CRUD_ABI, CRUD_ADDRESS)
    this.setState({ crud })
    const postCount = await crud.methods.postsCount().call()
    this.setState({ postCount })
    for (var i = 1; i <= postCount; i++) {
      const post = await crud.methods.posts(i).call()
      this.setState({
        posts: [...this.state.posts, post]
      })
    }
    this.setState({ loading: false })
  }

  addPost(content) {
    this.setState({ loading: true })
    this.state.crud.methods.addPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  deletePost(postId) {
    this.setState({ loading: true })
    this.state.crud.methods.deletePost(postId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    }) 
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      postCount: 0,
      posts: [],
      loading: true
    }
    this.addPost = this.addPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank" rel="noreferrer">Dapp University | Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <PostList posts={this.state.posts} addPost={this.addPost} deletePost={this.deletePost} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;