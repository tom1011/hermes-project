import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepperBar from "../StepperBar/StepperBar";
import "./PublishPage.css";

//this page will need to send the post requests to the selected platforms

//this is just the bare bones layout

class PublishPage extends Component {
    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_FIVE" })
    }//this button is when we are sending off both files to each site
    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.history.push('/connect');
    }
    render() {
        return (
            <>
                <StepperBar activeStep='5'></StepperBar>
                <div>
                    <div className="grid-container">
                        <div className="left">
                            <h1 className="header" >Congratulations!</h1>
                            <h2>Your post was successful!</h2>
                        </div>
                        <div className="bigHermImage" >
                            <img src="images/bigherm.png" alt="HERMES" />
                        </div>
                        <div className="buttonLeft">
                            <div><button>  <img className="icons" src="images/logo/podbean.png" alt="podbean_link" /></button></div>
                            <div>
                                <button>  <img className="icons" src="images/logo/WordPress.png" alt="podbean_link" /></button>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
                <div>
                    <a target="_blank" href="https://junomercury.home.blog/2019/04/26/gates-do-they-count/" rel="noopener noreferrer">Link to WordPress</a>
                </div>
                <div>
                    <a target="_blank" href="https://leoronone.podbean.com/e/gates-do-they-count/" rel="noopener noreferrer">Link to PodBean</a>
                </div>
                <div className="publishButton">
                    <button onClick={this.handleClick}>Start Another Project</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PublishPage);