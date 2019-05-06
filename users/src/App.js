import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  state = {
    users: [],
    message: '',
    username: '',
    password: '',
  }

  changeHandler = (e) => {
    e.preventDefault()
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  register = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/register', { username: this.state.username, password: this.state.password})
      .then(res => {
        console.log(res)
        this.setState({
          message: 'Hurrraaayyyyy..... Succceeesssss You can login now',
          username: '',
          password: ''
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          username: '',
          password: ''
        })
      })
  }

  login = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', { username: this.state.username, password: this.state.password})
      .then(res => {
        console.log(res)
        this.setState({
          message: res.data.message,
          username: '',
          password: ''
        })  
        // axios
        // .get("http://localhost:5000/api/users", {headers: { username: this.state.username, password: this.state.password}})
        // .then(resp => {
        //   console.log(resp)
        //   this.setState({
        //     // users: res.data,
        //     username: '',
        //     password: ''
        //   })  
        //   console.log(this.state)
        // })
        // .catch(error => {
        //   console.log(error)
        // })
        // localStorage.setItem('token', res.data.user.password)
      })
      .then()
      .catch(err => {
        console.log(err)
        this.setState({
          message: "I don't know you! GO AWAY!",
          username: '',
          password: ''
        })
      })
  }

  usersList = (e) => {
    e.preventDefault();

  }

  render() {
    return (
      <div className="App">
        <h1>Users App!</h1>
        <form>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button onClick={this.register}>Register</button>
          <button onClick={this.login}>LogIn</button>
          <h1>
            {this.state.message}
          </h1>
        </form>

        <div>
          {/* {localStorage.getItem('token') ? <button>Show Users</button> : ''} */}
        </div>
      </div>
    );
  
  }
}

export default App;
