import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import '../App/App.css';
import StepperBar from '../StepperBar/StepperBar'
import './Upload.css';


class UploadPage extends Component {
    
    state = {
        file: '',
        uploading: false,
    }

    handleOnChange = (e) => {
        console.log('handleOnChange');
        console.log(e.target.files)
        const file = e.target.files;
        console.log('file', file[0]);
        this.setState({
            file: FileList
        });

        // const files = Array.from(e.target.files)
        // console.log('files', files);
        
        // this.setState({ uploading: true })

        // const formData = new FormData()
        // console.log('new FormData', new FormData() );
        
        // files.forEach((file, i) => {
        //     formData.append(i, file)
        // });
        // console.log('formData', formData);
        
        
        
    }
    
 
    fileUpload = async (event) => {
        console.log('fileUpload hit');
        event.preventDefault();

        // const data = new FormData('upload');
        // data.append('file', this.state.file);
        // console.log('data', data);
        console.log('file', this.state.file);
        
        // send file to googleSaga
        await this.props.dispatch({ type: 'SEND_AUDIO', payload: this.state.fileList});

        // this.props.history.push('/edit-page');
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
                <StepperBar/>

                {JSON.stringify(this.state)}
                {/* <form id="upload" name="upload"> */}
                    <div>
                        <label htmlFor="userFile">Choose file:</label>
                        <input
                            id="userFile"
                            type="file"
                            name="userFile"
                        // webkitdirectory
                            onChange={this.handleOnChange}
                            // ref={(ref) => { this.uploadInput = ref; }}
                        />
                    </div>
                    <div>
                        <button onClick={this.handleCancelButton}>Cancel</button>
                        <button onClick={this.fileUpload}>Upload</button>
                    </div>                    
                    
                {/* </form> */}
            
                
               
                

            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(UploadPage);
