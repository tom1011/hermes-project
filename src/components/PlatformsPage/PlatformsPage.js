import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import StepperBar from '../StepperBar/StepperBar';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';

import './PlatformsPage.css';



class PlatformsPage extends Component {
componentDidMount=()=>{
    this.props.dispatch({type: "STEP_ONE"})
}
    handleSelectPlatformsButton = (event) => {
        console.log('handleSelectPlatformsButton hit');
        this.props.history.push('/upload')
        // hit sweet alert --> if user clicks continue, direct user to next step: Upload.
        // if user clicks cancel, stay on this page and keep users previously checked options
        event.preventDefault();
        this.props.history.push('/upload');
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
                <StepperBar />
                <div>
                    WHICH PLATFORM WOULD YOU LIKE TO POST TO?
                </div>
                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="space-evenly"
                >
                    <Grid item>
                        <div className="blog-rectangle">
                            Blog
                            <p className="line"></p>
                    <div>
                                <input type="checkbox" id="WordPress" name="WordPress" />
                                <label htmlFor="WordPress" className="wordpress-label">WordPress</label>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <div>
                            Podcast
                    <div>
                                <input type="checkbox" id="PodBean" name="PodBean" />
                                <label htmlFor="PodBean">PodBean</label>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div>
                    <button>CANCEL</button>
                    <button onClick={this.handleSelectPlatformsButton}>START POSTING</button>
                   
                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PlatformsPage);
