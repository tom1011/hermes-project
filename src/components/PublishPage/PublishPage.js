import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepperBar from "../StepperBar/StepperBar";

//this page will need to send the post requests to the selected platforms

//this is just the bare bones layout

class PublishPage extends Component {
componentDidMount=()=>{
    this.props.dispatch({type: "STEP_FIVE"})
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
                    <h1>Congratulations! Your post was successful!</h1>
                    <br />
                </div>
                <div>
                    <button onClick={this.handleClick}>Publish Another Project</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PublishPage);