import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';


class PlatformsPage extends Component {

    handleSelectPlatformsButton = () => {
        console.log('handleSelectPlatformsButton hit');
        // hit sweet alert --> if user clicks continue, direct user to next step: Upload.
        // if user clicks cancel, stay on this page and keep users checked options
    }

    render() {
        return (
            <>
                <div>
                    Blog
                    <div>
                        <input type="checkbox" />WordPress
                    </div>
                </div>

                <div>
                    Podcast
                    <div>
                        <input type="checkbox" />PodBean
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
