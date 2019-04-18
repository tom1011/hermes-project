import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditWordPressForm extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        // this.props.history.push('/review-page');
    }

    render() {
        return (
            <>
                <div>
                    <h1>Edit Required Information for WordPress</h1>
                </div>
                <div>
                    <button onClick={this.handleClick}>Submit</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(EditWordPressForm);