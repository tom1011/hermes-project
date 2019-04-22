import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import '../App/App.css';


class UploadPage extends Component {

    state = {
        file: '',
    }

    handleUploadButton = (event) => {
        console.log('handleUploadButton hit');
        event.preventDefault();
        this.props.history.push('/edit-page');
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
        this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: filePath });
    };


    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
            title: "Are you sure?",
            text: "Careful, you will lose all progress and information forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    this.props.history.push('/connect');
                } else {
                    swal("Your imaginary file is safe!");
                }
            });


    }

    render() {
        return (
            <>

                <div>
                    <label htmlFor="userFile">Choose file:</label>
                    <input
                        id="userFile"
                        type="file"
                        name="userFile"
                        onChange={this.handleFileUpload}
                    />
                    <br />
                    <button onClick={this.handleCancelButton}>Cancel</button>
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
