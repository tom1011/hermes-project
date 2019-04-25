import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepperBar from '../StepperBar/StepperBar';
import swal from 'sweetalert';


//this page will need to send the post requests to the selected platforms

//this is just the bare bones layout

class ReviewPage extends Component {
    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_FOUR" })
    }
    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.history.push('/publish-page');
    }

    handleClickEdit = (event) => {
        event.preventDefault();
        console.log('return to edit page button clicked');
        this.props.history.push('/edit-page');
    }

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
                    this.props.history.push('/platforms');
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    render() {
        return (
            <>
                <div>
                    <StepperBar activeStep='4'></StepperBar>
                    <div className="box">
                        <h1 className="header">Review sites to be published to</h1>
                        <br />
                        <p className="podbean">PodBean</p>
                        <p>WordPress</p>
                        <button onClick={this.handleClickEdit}>Edit</button>
                    </div>
                </div>
                <div>
                    <button className="cancelButton" onClick={this.handleCancelButton}>Cancel</button>
                    <button onClick={this.handleClick}>Publish Your Project</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ReviewPage);