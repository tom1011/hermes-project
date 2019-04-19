import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPodBeanForm from './EditPodBeanForm';
import EditWordPressForm from './EditWordPressForm';

import swal from 'sweetalert';

class EditPage extends Component {

    //need to conditionally send it either to the transcript page
    //or to the review page
    handleClick = (event) => {
        event.preventDefault();
        console.log('Next button clicked on edit page');
        // this.props.history.push('/review-page');
    }

    //use the same function as the other pages for this button
    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
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
                    <button onClick={this.handleCancelButton}>Cancel</button>
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