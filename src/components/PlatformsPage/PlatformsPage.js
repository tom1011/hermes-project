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
                <StepperBar className="stepperBackgroundColor"></StepperBar>
                <div className="bigBox">
                    <div className="box">
                        <h2 className="platform-heading-roboto">
                            SELECT PLATFORM

                        </h2>
                        <h3 className="platform-heading">
                            Where would you like to post?
                        </h3>

                        <div className="item-box  platform-grid-container">
                            <div className="platform-grid-item1">
                                <div className="boxHeader">
                                    <img className="icons" src="images/icons/BLOG.png" alt="blog" />
                                    Blog
                           </div>
                                <div className="checkBox">
                                    <input className="checkboxSquare" type="checkbox" id="WordPress" name="WordPress" />
                                    <label className="platformImages" htmlFor="WordPress" > <img src="images/logo/wordpress.png" alt="WordPress Logo" /></label>
                                </div>
                            </div>
                            <div className="platform-grid-item2">
                                <div className="boxHeader">
                                    <img className="icons" src="images/icons/MICROPHONE.png" alt="Podcast" />
                                    Podcast
                            </div>
                                <div className="checkBox">
                                    <input className="checkboxSquare" type="checkbox" id="PodBean" name="PodBean" />
                                    <label className="platformImagesPod" htmlFor="PodBean"> <img src="images/logo/PodBean.png" alt="podbean logo" /> </label>
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
                        <button className="myButton2" onClick={this.handleCancelButton}>Cancel</button>
                        <button className="myButton" onClick={this.handleSelectPlatformsButton}>START POSTING</button>
                    </div>
                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PlatformsPage);