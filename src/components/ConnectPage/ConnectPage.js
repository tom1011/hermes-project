import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import './ConnectPage.css';
import Grid from '@material-ui/core/Grid';

class ConnectPage extends Component {

    handleStartPostButton = (event) => {
        console.log('handleStartPostButton hit');
        // direct to next step: Select Platform
        event.preventDefault();
        this.props.history.push('/platforms');
        this.props.dispatch({ type: "STEP_ONE" })
    }
    componentDidMount() {
        this.props.dispatch({ type: 'CHECK_TOKEN' })

    }

    render() {
        return (
            <>
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="space-evenly"
                >
                    <div onClick={this.handleWordPressClick} className="platforms-connect">
                        <Grid>
                            <div>
                                Connect with
                    </div>
                        </Grid>
                        <Grid>
                            <a href='https://public-api.wordpress.com/oauth2/authorize?client_id=65413&response_type=code&redirect_uri=http://localhost:5000/wordpress/callback_wordpress'>
                                <button>
                                    <img className="icons" src="images/logo/WordPress.png" alt="wordpress_link" />
                                </button>
                            </a>
                        </Grid>
                    </div>
                    <div onClick={this.handlePodBeanClick} className="platforms-connect">
                        <div>
                            Connect with
                    </div>
                        <div>
                            <a href='https://api.podbean.com/v1/dialog/oauth?redirect_uri=https://hermes-host.herokuapp.com/podbean/callback_podbean&scope=episode_publish&response_type=code&client_id=7ae314124aac5c7de467d'>
                                <button>  <img className="icons" src="images/logo/podbean.png" alt="podbean_link" /></button></a>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.handleStartPostButton}>Start Posting</button>
                    </div>

                </Grid>
                <div>
                    <LogOutButton className="log-in" />
                </div>
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ConnectPage);
