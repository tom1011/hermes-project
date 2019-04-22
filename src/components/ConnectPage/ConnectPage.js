import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import './ConnectPage.css';

class ConnectPage extends Component {

    handleWordPressClick = () => {
        console.log('handleWordPressClick hit');
        // direct user to WordPress auth
    }

    handlePodBeanClick = () => {
        console.log('handlePodBeanClick hit');
        // direct user to PodBean auth
    }

    handleStartPostButton = (event) => {
        console.log('handleStartPostButton hit');
        // direct to next step: Select Platform
        event.preventDefault();
        this.props.history.push('/platforms');
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
                        WordPress
                    </div>
                </div>
                <div onClick={this.handlePodBeanClick} className="platforms-connect">
                    <div>
                        Connect with
                    </div>
                    <div>
                        PodBean
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
