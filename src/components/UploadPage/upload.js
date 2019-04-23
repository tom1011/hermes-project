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

        console.log('handleOnChange',  Array.from(e.target.files));
        console.log(e.target.files)
        const file = e.target.files;
        console.log('file', file[0]);
        this.setState({
            file: file[0]
        });
    }


    componentDidMount=()=>{
    this.props.dispatch({type: "STEP_TWO"})
    


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
        await this.props.dispatch({ type: 'SEND_AUDIO', payload: this.state.file['name']});

        // this.props.history.push('/edit-page');

        // const data = new FormData();
        // data.append('file', this.uploadInput.files[0]);
        // data.append('fileName', this.fileName.value);
        // // send file to redux
        // // await this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: data });
        // // send file to server
        // this.addNewFile(data)

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

        // this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: filePath });

    };




    //Sweet Alert Code
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
                <StepperBar />


                {JSON.stringify(this.state)}
                {/* <form id="upload" name="upload"> */}
                    <div>

                {/* {JSON.stringify(this.props.reduxState)} */}
                <button onSubmit={this.handleUploadButton}/>

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
                    
                <form>
            
                
               
                
<div>

                            // onChange={this.handleFileUpload}
                            ref={(ref) => { this.uploadInput = ref; }}
                        />

                        <br />
                        
                        <button onClick={this.handleCancelButton}>Cancel</button>
                        <button onClick={this.handleUploadButton}>Upload</button>
                    </div>
                </form>

            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(UploadPage);
