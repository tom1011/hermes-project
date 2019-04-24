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

    handleOnChange = (e) => {
        console.log('handleOnChange');
        console.log(e.target.files);
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        console.log('file', file);
        // this.setState({
        //     file: file
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
                <form action="/googleCloud/uploadfile" encType="multipart/form-data" method="POST" onSubmit={this.uploadRequest} >
                    <div>
                        <label htmlFor="userFile">Choose file:</label>
                        <input
                            id="userFile"
                            type="file"
                            name="userFile"
                            onChange={this.handleOnChange}
                        />
                    </div>
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
