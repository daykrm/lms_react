import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Col,Row,Form} from 'react-bootstrap';
import Axios from "axios";

export default class AddArt extends Component {
    constructor(props){
        super(props)
        this.state = {
            artName : '',
            artDetail : 'Nothing',
            status : '1'
        }
    }
    handleSubmit = e =>{
        Axios.post('/addart',{
            body : JSON.stringify(this.state)
        }).then(res=>{
            alert(res.data)
            this.props.history.push('/')
        })
    }
    handleChange = e =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }
    render() {
        return (
            <div>
                <h4>Article's Name</h4>
                <Row>
                    <Col xd={12}>
                        <Form.Control type="text" onChange={this.handleChange} value={this.state.artName} name="artName"/>
                    </Col>
                </Row>
                <h4 className ="MarginTop">Article's Detail</h4>
                <CKEditor
                    onInit={ editor => {
                        console.log( 'Editor is ready to use!', editor );

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({artDetail: data})
                    } }
                    editor={ DecoupledEditor }
                    data="<p>Type your content here!</p>"
                />
                <center className ="MarginTop">
                <button type="button" onClick={this.handleSubmit}>Submit</button></center>
            </div>
        )
    }
}
