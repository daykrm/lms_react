import React, { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";
import {A} from "./StyledComponent";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {}
  getData = () => {
    Axios.get("api/article").then(res => {
      this.setState({ data: res.data });
    });
  };
  renderData = ({ artID, artName }) => (
    <Row>
      <Col xs={12}>
        <Card key={artID} className="MarginTop">
          <Card.Body>
            <Link to={`/article/${artID}`}>
              <A href="#">{artName}</A>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ); 
    
  render() {
    const { data } = this.state;
    return (
      <div>
        <Container>{data.map(this.renderData)}</Container>
      </div>
    );
  }
}
