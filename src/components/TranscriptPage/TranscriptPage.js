import React, { Component } from 'react';
import { connect } from 'react-redux';
import TranscriptEditor from './TranscriptEditor';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class TranscriptPage extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.history.push('/review-page');
    }

    render() {
        return (
            <>
                <div>
                    <h1>Edit Text for WordPress</h1>
                    <TranscriptEditor />
                </div>
                <div>
                    <button onClick={this.handleClick}>Submit Edits</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TranscriptPage);