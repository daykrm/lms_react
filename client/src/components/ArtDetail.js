import React, { Component } from "react";
import Axios from "axios";

export default class ArtDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.ID,
      detail: "Loading...",
      name: "Loading..."
    };
  }
  componentDidMount() {
    Axios.get(`api/article/${this.state.id}`).then(res => {
      var test = res.data;
      var test2 = test[0];
      this.setState({ detail: test2.artDetail, name: test2.artName });
    });
  }
  render() {
    return (
      <div>
        <center>
          <h4 className="MarginTop">เรื่อง {this.state.name}</h4>
        </center>
        <div
          className="MarginTop"
          dangerouslySetInnerHTML={{ __html: this.state.detail }}
        />
      </div>
    );
  }
}
