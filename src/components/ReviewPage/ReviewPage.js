import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepperBar from '../StepperBar/StepperBar';
import swal from 'sweetalert';
// import podbean from '../../../public/images/logo/podbean.png';
import './ReviewPage.css';


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
                    <div className="overallBox">
                        <h3 className="review-heading">Review sites to be published to</h3>
                        <center>
                        <div className="grid-container">
                            <div className="reviewBox">

                                <img className="imageBox" src="images/logo/box_icon_review.png" alt="image logo" />
                            </div>
                        </div>
                        </center>
                        <div className="buttonsReview">
                            <button className="myButton" onClick={this.handleCancelButton}>Cancel</button>
                            <button className="myButton" onClick={this.handleClickEdit}>Edit</button>
                            <button className="myButton" onClick={this.handleClick}>Publish</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ReviewPage);