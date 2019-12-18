import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    Axios.post("/api/login", {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };
  render() {
    return (
      <div>
        <style type="text/css">
          {`
    .btn-flat {
      background-color: #ff2667;
      color: white;
    }
    `}
        </style>
        <h4>Username</h4>
        <Form.Control
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <h4 className="MarginTop">Password</h4>
        <Form.Control
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <center>
          <Button className="MarginTop" variant="flat" size="lg">
            Login
          </Button>
        </center>
      </div>
    );
  }
}
