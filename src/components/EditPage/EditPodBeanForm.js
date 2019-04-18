import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditPodBeanForm extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        // this.props.history.push('/review-page');
    }

    render() {
        return (
            <>
                <div>
                    <h1>Edit Required Information for PodBean Podcast</h1>
                </div>
                <div>
                    <button onClick={this.handleClick}>Submit Edits</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(EditPodBeanForm);