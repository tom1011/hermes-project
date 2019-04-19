import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';


class UploadPage extends Component {
    
    state = {
        file: '',
    }

    handleUploadButton = () => {
        console.log('handleUploadButton hit');
        // hit sweet alert --> if user clicks continue, 
        // send file to GL storage and make get transcript request
        // direct user to next step: Edit
        // if user clicks cancel, stay on this page and keep previously chosen file
        // upload file to GC Storage

    }

    handleFileUpload = (event) => {
        console.log('handleFileUpload hit');
        let filePath = event.target.value;
        console.log('fileName', filePath);
        // send file to redux
        this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: filePath});
    };
    
    

    render() {
        return (
            <>
                
                <div>
                    <label for="userFile">Choose file:</label>
                    <input
                        id="userFile"
                        type="file"
                        name="userFile"
                        onChange={this.handleFileUpload}
                    />
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
