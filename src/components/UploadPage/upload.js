import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import '../App/App.css';


class UploadPage extends Component {
    

    handleUploadButton = () => {
        console.log('handleUploadButton hit');
        // send file to server
        // const data = new FormData();
        // data.append('file', this.state.)
        // hit sweet alert --> if user clicks continue, 
        // send file to GL storage and make get transcript request
        // direct user to next step: Edit
        // if user clicks cancel, stay on this page and keep previously chosen file
        // upload file to GC Storage

    }

    handleFileUpload = async (event) => {
        console.log('handleFileUpload hit');
        event.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('fileName', this.fileName.value);

        // send file to redux
        // await this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: data });

        // send file to server
        this.addNewFile(data)
        
    };

    addNewFile = (file) => {
        // send to server
        axios({
            method: 'POST',
            url: '/upload',
            data: file,
        }).then(response => {
            console.log('posting:', response);
        }).catch(error => {
            console.log('error with post to /upload', error);
        });
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
                {JSON.stringify(this.props.reduxState)}
                <form onSubmit={this.handleUploadButton}>
                    <label htmlFor="userFile">Choose file:</label>
                    <input
                        id="userFile"
                        type="file"
                        name="userFile"
                        // onChange={this.handleFileUpload}
                        ref={(ref) => { this.uploadInput = ref; }}
                    />
                    <button onClick={this.handleCancelButton}>Cancel</button>
                    <button >Upload</button>
                </form>
            
                
                
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(UploadPage);
