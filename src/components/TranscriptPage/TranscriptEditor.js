import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


//creating the text editor and making functionality
class TranscriptEditor extends Component {
    state = {
        text: this.props.reduxStore.editReducer.transcriptReducer.transcription,
    }



    handleChange = (html) => {
        this.setState({ editorHtml: html });

    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
        ],
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    render() {
        return (
            <div>

                <ReactQuill theme="snow"
                    value={this.state.text}
                    modules={this.modules}
                    formats={this.formats}
                    // onChange={this.handleChange}
                >
                </ReactQuill>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default connect(mapReduxStoreToProps)(TranscriptEditor);