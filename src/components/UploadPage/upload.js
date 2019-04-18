import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';


class UploadPage extends Component {

    handleUploadButton = () => {
        console.log('handleUploadButton hit');
        // hit sweet alert --> if user clicks continue, direct user to next step: Edit.
        // if user clicks cancel, stay on this page and keep previously chosen file
        // upload file to GC Storage

    }
    

    render() {
        return (
            <>
                
                <div>
                    <label for="userFile">Choose file:</label>
                    <input type="file" id="userFile" name="userFile" />
                </div>
            
                
                <button>Cancel</button>
                <button onClick={this.handleUploadButton}>Upload</button>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(UploadPage);
