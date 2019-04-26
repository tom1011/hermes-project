import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';

import swal from 'sweetalert';
import StepperBar from '../StepperBar/StepperBar'

import './PlatformsPage.css';

class PlatformsPage extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_ONE" })
    }
    handleSelectPlatformsButton = (event) => {
        console.log('handleSelectPlatformsButton hit');
        this.props.history.push('/upload')
        // hit sweet alert --> if user clicks continue, direct user to next step: Upload.
        // if user clicks cancel, stay on this page and keep users previously checked options
        event.preventDefault();
        this.props.history.push('/upload');
    }

    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
           
            text: "Are you sure this is the correct file for upload!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your file has been uploaded", {
                        icon: "success",
                    });
                    this.props.history.push('/connect');
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <StepperBar ></StepperBar>
                <div className="box">
                <h2 className="platform-heading">
                    WHICH PLATFORM WOULD YOU LIKE TO POST TO?
                </h2>
                <div className="grid-container">
                    <div className="item-box grid-item1">
                        <div className="boxHeader">
                            <img className="icons" src="images/icons/BLOG.png" alt="blog" />
                            Blog
                        </div>
                        <p className="line"></p>
                        <div className="checkBox">
                            <input className="checkboxSquare" type="checkbox" id="WordPress" name="WordPress" />
                            <label htmlFor="WordPress" className="wordpress-label">WordPress</label>
                        </div>
                    </div>


                    <div className="item-box grid-item2">
                        <div className="boxHeader">
                            <img className="icons" src="images/icons/MICROPHONE.png" alt="Podcast" />
                            Podcast
                        </div>
                        <p className="line"></p>
                        <div className="checkBox">
                            <input className="checkboxSquare" type="checkbox" id="PodBean" name="PodBean" />
                            <label htmlFor="PodBean">PodBean</label>
                        </div>
                    </div>
                    </div>

                    {/* <div className="item-box grid-item3">
                        <div className="boxHeader">
                            <img className="icons" src="images/icons/VIDEO.png" alt="Podcast" />
                        </div>
                        <p className="line"></p>
                        <div className="checkBox">
                            <input className="checkboxSquare" type="checkbox" id="PodBean" name="PodBean" />
                            <label htmlFor="PodBean">YouTube</label>
                        </div>
                        <div class="centered">COMING SOON</div>
                    </div> */}

                </div>

                <div>
                    <button className="myButton" onClick={this.handleCancelButton}>CANCEL</button>
                    <button className="myButton" onClick={this.handleSelectPlatformsButton}>START POSTING</button>

                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PlatformsPage);
