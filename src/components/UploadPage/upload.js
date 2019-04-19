import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
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
    
    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

        
    }

    render() {
        return (
            <>
                <button onClick={this.handleChooseFileButton}>Choose File</button>
                <div>
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
