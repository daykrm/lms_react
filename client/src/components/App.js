import React, { Component } from "react";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Col,Row,Container} from "react-bootstrap";
import Menu from "./Menu";
import ArtDetail from "./ArtDetail";
import AddArt from "./AddArt";
import Login from "./Login";
import Aims from "./Aims";
import Coach from "./Coach";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Container fluid={true}>
          <Row>
            <Col>
              <Menu/>
            </Col>
            <Col xs={10}>
            <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aims" component={Aims}/>
          <Route path="/coach" component={Coach}/>
          <Route path="/addart" component={AddArt}/>
          <Route path="/login" component={Login}/>
          <Route path="/article/:ID" component={ArtDetail}/>
        </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}
