import React, { Component } from 'react';
import { connect } from 'react-redux';
import TranscriptEditor from './TranscriptEditor';

import swal from 'sweetalert';
import 'react-quill/dist/quill.snow.css';


class TranscriptPage extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.history.push('/edit-page');
    }

    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
            title: "Are you sure?",
            text: "Careful, you will lose all progress and information forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    this.props.history.push('/connect');
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    render() {
        return (
            <>
                <div>
                    <h1>Edit Text for WordPress</h1>
                    <TranscriptEditor />
                </div>
                <div>
                    <button onClick={this.handleCancelButton}>Cancel</button>
                    <button onClick={this.handleClick}>Submit Edits</button>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TranscriptPage);