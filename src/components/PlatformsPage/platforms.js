import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';


class PlatformsPage extends Component {

    handleSelectPlatformsButton = () => {
        console.log('handleSelectPlatformsButton hit');
        // hit sweet alert --> if user clicks continue, direct user to next step: Upload.
        // if user clicks cancel, stay on this page and keep users previously checked options
    }

    render() {
        return (
            <>
                <div>
                    Which platforms would you like to publish to?
                </div>
                <div>
                    Blog
                    <div>
                        <input type="checkbox" id="WordPress" name="WordPress"/>
                        <label for="WordPress">WordPress</label>
                    </div>
                </div>

                <div>
                    Podcast
                    <div>
                        <input type="checkbox" id="PodBean" name="PodBean"/>
                        <label for="PodBean">PodBean</label>
                    </div>
                </div>
                
                <div>
                    <button>Cancel</button>
                    <button onClick={this.handleSelectPlatformsButton}>Select Platforms</button>
                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PlatformsPage);
