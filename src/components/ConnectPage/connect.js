import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import LogOutButton from '../LogOutButton/LogOutButton';

class ConnectPage extends Component {

    handleStartPostButton = (event) => {
        console.log('handleStartPostButton hit');
        // direct to next step: Select Platform
        event.preventDefault();
        this.props.history.push('/platforms');
    }
    componentDidMount () {
        this.props.dispatch({type: 'CHECK_TOKEN'})
    }

    render() {
        return (
            <>
            <div>
                    <div>
                        {/* <h1 id="welcome">
                            Welcome, {props.user.username}!
                        </h1>
                        <p>Your ID is: {props.user.id}</p> */}
                        <LogOutButton className="log-in" />
                    </div>
            </div>
                <div onClick={this.handleWordPressClick} className="platforms-connect">
                    <div>
                        Connect with 
                    </div>
                    <div>
                    <a href= 'https://public-api.wordpress.com/oauth2/authorize?client_id=65413&response_type=code&redirect_uri=http://localhost:5000/wordpress/callback_wordpress'>
                    wordpress</a>
                    </div>
                </div>
                <div onClick={this.handlePodBeanClick} className="platforms-connect">
                    <div>
                        Connect with
                    </div>
                    <div>
                    <a href='https://api.podbean.com/v1/dialog/oauth?redirect_uri=https://hermes-host.herokuapp.com/podbean/callback_podbean&scope=episode_publish&response_type=code&client_id=7ae314124aac5c7de467d'>
                    Podbean</a>
                    </div>
                </div>
                <div>
                    <button onClick={this.handleStartPostButton}>Start Posting</button>
                </div>
                
            </>
        );
    };
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ConnectPage);
