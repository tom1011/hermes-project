import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import StepperBar from '../StepperBar/StepperBar';

class PlatformsPage extends Component {

    handleSelectPlatformsButton = () => {
        console.log('handleSelectPlatformsButton hit');
        this.props.history.push('/upload')
        // hit sweet alert --> if user clicks continue, direct user to next step: Upload.
        // if user clicks cancel, stay on this page and keep users previously checked options
    }

    render() {
        return (
            <>
                <StepperBar/>
                <div>
                    WHICH PLATFORM WOULD YOU LIKE TO POST TO?
                </div>
                <div>
                    Blog
                    <div>
                        <input type="checkbox" id="WordPress" name="WordPress"/>
                        <label htmlFor="WordPress">WordPress</label>
                    </div>
                </div>

                <div>
                    Podcast
                    <div>
                        <input type="checkbox" id="PodBean" name="PodBean"/>
                        <label htmlFor="PodBean">PodBean</label>
                    </div>
                </div>
                
                <div>
                    <button>CANCEL</button>
                    <button onClick={this.handleSelectPlatformsButton}>START POSTING</button>
                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PlatformsPage);
