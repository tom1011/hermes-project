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
        console.log('handleOnChange');
        console.log(e.target.files);
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        console.log('file', file);

        this.uploadRequest(file);
    }
    
 
    uploadRequest =  (file) => {
        console.log(file)
        console.log('uploadRequest hit');
        
        let data = new FormData();
        data.append('file', file );
        console.log('data', data);
    
        // axios({
        //     method: 'POST',
        //     data: data,
        //     url: '/googleCloud/upload'
        // })
        this.props.dispatch({type: "SEND_AUDIO", payload: data })
        this.props.dispatch({type: "UPDATE_PODBEAN_MEDIA", payload: data})
        this.props.history.push('/edit-page');
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

            <div>
                <StepperBar activeStep='2'></StepperBar>
                
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
            </div>
        );
    };
};
const mapReduxStateToProps = reduxState => ({
    reduxState
});
export default connect(mapReduxStateToProps)(UploadPage);
