import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditPage extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        // this.props.history.push('/review-page');
    }

    render() {
        return (
            <>
                <div>
                    (insert stepper here)
                    <h1>Edit Page</h1>

                    (insert progress bar here)
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

export default connect(mapReduxStateToProps)(EditPage);