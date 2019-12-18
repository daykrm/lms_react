import React, { Component } from "react";
import logo from "../assets/logo.svg";
import { Button, Nav, Navbar } from "react-bootstrap";
import {Link} from "react-router-dom";
import "./App.css";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar className="MyTable" expand="lg">
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            <img
              alt="logo"
              src={logo}
              width="35"
              className="d-inline-block align-top"
            />
            {"Nakorn Khon Kaen School"}
          </Navbar.Brand>
          <Navbar.Collapse>
          <Nav className="mr-auto" >
          </Nav>
          <Link to="/login"><Button variant="outline-light">Logina</Button></Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
