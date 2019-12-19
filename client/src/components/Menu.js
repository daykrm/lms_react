import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { A } from "./StyledComponent";

export default class Menu extends Component {
  render() {
    return (
      <div className="MarginTop">
        <Card>
          <Card.Header
            style={{
              backgroundColor: "#ff2667",
              color: "white",
              textAlign: "center"
            }}
          >
            <strong>เมนู</strong>
          </Card.Header>
          <Card.Body className="App-body">
            <center>
              <Link to="/">
                <A href="#">บทเรียน</A>
              </Link>
              <br />
              <Link to="/aims">
                <A href="#">จุดประสงค์การเรียนรู้</A>
              </Link>
              <br />
              <Link to="/coach">
                <A href="#">ที่ปรึกษา</A>
              </Link>
              <br />
              <Link to="/addart">
                <A href="#">Addart</A>
              </Link>
              <br />
              <A
                href="https://www.facebook.com/groups/466647190762171/"
                target="_blank"
              >
                ระดมสมอง
              </A>
              <br />
              <A href="https://repl.it/languages/python3" target="_blank">
                ทดลอง
              </A>
            </center>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
