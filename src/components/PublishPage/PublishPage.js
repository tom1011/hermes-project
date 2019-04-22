import React, { Component } from 'react';
import { connect } from 'react-redux';


//this page will need to send the post requests to the selected platforms

//this is just the bare bones layout

class PublishPage extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.history.push('/connect');
    }


    render() {
        return (
            <>
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