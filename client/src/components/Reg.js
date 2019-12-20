import React, { Component } from "react";
const axios = require("axios");

export default class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    };
  }
  handleInputChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    //const {data} = this.state
    //alert(JSON.stringify(this.state));
    e.preventDefault();
    axios
      .post("/reg", {
        body: JSON.stringify(this.state),
      })
      .then(res => {
        alert(res.data);
        this.props.history.push("/login");
      });
  };
  render() {
    const { firstName, lastName, username, password } = this.state;
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <form onSubmit={this.handleSubmit} method="POST">
                <h2 class="App">Sign Up</h2>
                <div class="form-group">
                  <label>Firstname</label>
                  <input
                    type="text"
                    class="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Lastname</label>
                  <input
                    type="text"
                    class="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    class="form-control"
                    name="username"
                    value={username}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-outline-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
