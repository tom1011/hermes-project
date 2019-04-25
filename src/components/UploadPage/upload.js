import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import '../App/App.css';
import StepperBar from '../StepperBar/StepperBar'
import './Upload.css';


class UploadPage extends Component {

    
    state = {
        file: null,
        uploading: false,
    }


    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_TWO" })
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
    


    handleOnChange = (e) => {
        console.log('handleOnChange');
        console.log(e.target.files);
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        console.log('file', file);
        // this.setState({
        //     file: file

        // const files = Array.from(e.target.files)
        // console.log('files', files);
        
        // this.setState({ uploading: true })

        // const formData = new FormData()
        // console.log('new FormData', new FormData() );
        
        // files.forEach((file, i) => {
        //     formData.append(i, file)
        // });
        
        // const file = e.target.files[0];
        // console.log(e.target.files);
        // console.log(e.target.files[0]);
        // let file = e.target.files[0];
        // this.setState({file: file});
        
        // console.log('file', file);
        
        this.uploadRequest(file);
    
    }
    
 
    uploadRequest =  (file) => {
        console.log('uploadRequest hit');
        // event.preventDefault();
        console.log(this.state, 'STATE _____________');
        let data = new FormData();
        data.append('file', file );
        console.log('data', data);

        

        // see what's in FormData
        for (var pair of data.entries()) {
            console.log('in formdata', pair[0] + ', ' + pair[1]);
        }

        // // send file to googleSaga
        //  this.props.dispatch({ type: 'SEND_AUDIO', payload: data});
        axios({
            method: 'POST',
            data: data,
            url: '/googleCloud/uploadfile'
        }).then( response => {
            console.log('back from POST to /uploadfile', response);
            
        }).catch(error => {
            console.log('error with POST to /uploadfile', error);
            
        })

        // this.props.history.push('/edit-page');

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('fileName', this.fileName.value);
        // send file to redux
        // await this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: data });
        // send file to server

        // send file to googleSaga
        await this.props.dispatch({ type: 'SEND_AUDIO', payload: this.state.file['name']});

        

        // this.addNewFile(data)

    };

    // addNewFile = (file) => {
    //     // send to server
    //     axios({
    //         method: 'POST',
    //         url: '/upload',
    //         data: file,
    //     }).then(response => {
    //         console.log('posting:', response);
    //     }).catch(error => {
    //         console.log('error with post to /upload', error);
    //     });

    //     // this.props.dispatch({ type: 'UPLOAD_DOCUMENT', payload: filePath });

    // };




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
            <div>
                <StepperBar activeStep='2'></StepperBar>
                <form onSubmit={this.handleUploadButton}>
                
                {JSON.stringify(this.state)}

                <form action="/googleCloud/uploadfile" encType="multipart/form-data" method="POST" onSubmit={this.uploadRequest} >

                        <label htmlFor="userFile">Choose file:</label>
                        <input
                            id="userFile"
                            type="file"
                            name="userFile"
                            onChange={this.handleOnChange}
                        />
                    <div>

                    <button onClick={this.handleCancelButton}>Cancel</button>
                    <input type="submit" value="Upload" />
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
