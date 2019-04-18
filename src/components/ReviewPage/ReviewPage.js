import React, { Component } from 'react';
import { connect } from 'react-redux';

//this page will need to send the post requests to the selected platforms

//this is just the bare bones layout

class ReviewPage extends Component {

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

    render() {
        return (
            <>
                <div>
                    <h1>Review Your Post</h1>
                    <br />
                    <h4>Confirm the specific platforms you would like to publish to</h4>
                    <p>PodBean</p>
                    <p>WordPress</p>
                    <button onClick={this.handleClickEdit}>Edit</button>
                </div>
                <div>
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