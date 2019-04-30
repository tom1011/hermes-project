import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepperBar from "../StepperBar/StepperBar";
import "./PublishPage.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


//this page will need to send the post requests to the selected platforms

//this is just the bare bones layout

class PublishPage extends Component {
    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_FIVE" })
    }//this button is when we are sending off both files to each site
    handleClick = (event) => {
        event.preventDefault();
        console.log('button clicked');
        this.props.history.push('/connect');
    }
    render() {
        return (
            <>
                <StepperBar activeStep='5'></StepperBar>

                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    spacing={24}
                    className="container-publish-content"
                >
                    <Grid item sm={1} className="grid-blank">

                    </Grid> 
                    
                    <Grid item sm={4} className="grid-image">
                        
                        <img src="images/icons/bigherm.png" alt="HERMES" />
                    </Grid>

                    <Grid item sm={6}>
                        <Grid container
                            alignItems="left"
                            direction="column"
                            spacing={24}
                            
                        >
                           
                            <Grid item className="grid-logos">
                                <Grid container
                                    alignItems="left"
                                    direction="column"
                                    spacing={24}
                                >
                                    <Grid item>
                                        <Typography variant="h4" gutterBottom>Congratulations!</Typography>
                                        <Typography variant="h6" gutterBottom>Your post was successful!</Typography>
                                        <Typography variant="body1" gutterBottom>Click to view your posts</Typography>
                                    </Grid>
                                    <Grid item>
                                        <div className="platform-link">
                                            <a target="_blank" href="https://leoronone.podbean.com/e/episode-28-manatees-starting-to-recover/" rel="noopener noreferrer">
                                                <img className="icons" src="images/logo/podbean.png" alt="podbean_link" />
                                            </a>
                                        </div>
                                    </Grid>
                                    <Grid item >
                                        <div className="platform-link">
                                            <a  target="_blank" href="https://junomercury.home.blog/2019/04/30/manatees-starting-to-recover/" rel="noopener noreferrer">
                                                <img className="icons" src="images/logo/WordPress.png" alt="wordpress_link" />
                                            </a>
                                        </div>
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item className="grid-button">
                                <button className="myButton" onClick={this.handleClick}>START ANOTHER PROJECT</button>
                            </Grid>
                        </Grid>
                         
                    </Grid>
                    {/* <Grid item sm={3} className="grid-blank">

                    </Grid>  */}
                </Grid>

            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(PublishPage);