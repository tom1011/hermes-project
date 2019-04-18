import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';


class UploadPage extends Component {

    handleUploadButton = () => {
        console.log('handleUploadButton hit');
        // hit sweet alert --> if user clicks continue, direct user to next step: Edit.
        // if user clicks cancel, stay on this page and keep previously chosen file
    }

    handleChooseFileButton = () => {
        console.log('handleChooseFileButton hit');
        // upload file to GC Storage
    }
    

    render() {
        return (
            <>
                <button onClick={this.handleChooseFileButton}>Choose File</button>
                <div>
                    <button>Cancel</button>
                    <button onClick={this.handleUploadButton}>Upload</button>
                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(UploadPage);
