import React, { Component } from 'react';
import { connect } from 'react-redux';
import TranscriptEditor from './TranscriptEditor';

import swal from 'sweetalert';
import 'react-quill/dist/quill.snow.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class TranscriptPage extends Component {

    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.handleClose()
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
                <Grid 
                    container
                    direction="row"
                    spacing={16}
                    marginLeft='5px'
                    marginRight='5px'
                >
                    
                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            Edit your transcription for WordPress.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <TranscriptEditor />
                        </Paper>
                        
                    </Grid>
                    <Grid item>
                        <button className="myButton" onClick={this.handleCancelButton}>CANCEL</button>
                    </Grid>
                    <Grid item>
                        <button className="myButton" onClick={this.handleClick}>SUBMIT EDITS</button>
                    </Grid>
                </Grid>
                
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TranscriptPage);