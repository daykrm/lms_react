import React, { Component } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class AddArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artName: "",
      artDetail: "Nothing",
      status: "1"
    };
  }
  handleSubmit = e => {
    Axios.post("/addart", {
      body: JSON.stringify(this.state)
    }).then(res => {
      alert(res.data);
      this.props.history.push("/");
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <h4>Article's Name</h4>
        <Row>
          <Col xd={12}>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              value={this.state.artName}
              name="artName"
            />
          </Col>
        </Row>
        <h4 className="MarginTop">Article's Detail</h4>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.setState({ artDetail: data });
          }}
          config={{
            cloudServices: {
              tokenUrl: "https://49386.cke-cs.com/token/dev/r1v6Y0bDK3PsPURlWd2jrHTPHsgzeBUhmrWLSKQlKeMpine5w0Uvb5evGcVM",
              uploadUrl:
                "https://49386.cke-cs.com/easyimage/upload/"
            },
            toolbar: [
              "imageUpload",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "|",
              "undo",
              "redo"
            ]
          }}
        />
        <center className="MarginTop">
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </center>
      </div>
    );
  }
}
