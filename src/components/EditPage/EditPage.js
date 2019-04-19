import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPodBeanForm from './EditPodBeanForm';
import EditWordPressForm from './EditWordPressForm';


class EditPage extends Component {

    //need to conditionally send it either to the transcript page
    //or to the review page
    handleClick = (event) => {
        event.preventDefault();
        console.log('Next button clicked on edit page');
        // this.props.history.push('/review-page');
    }

    //use the same function as the other pages for this button
    handleCancel = (event) => {
        event.preventDefault();
        console.log('cancel button clicked on Edit page');
        // this.props.history.push('/');
    }

    render() {
        return (
            <>
                <div>
                    (insert stepper here)
                    <h2>Edit Page</h2>

                    (insert progress bar here)
                </div>
                <div>
                    <EditPodBeanForm />
                    <EditWordPressForm props={this.props}/>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.handleClick}>Next</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(EditPage);