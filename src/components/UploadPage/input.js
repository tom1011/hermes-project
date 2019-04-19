import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';


class Input extends Component {

    handleFileUpload = ({ file }) => {
        console.log('handleFileUpload hit');
        const file = files[0];
        this.props.actions.uploadRequest({
            file,
            name: '2 minute sample'
        })
    }
}


render() {
    return (
        <>
            <input 
                id="userFile"
                type="file" 
                name="userFile" 
                onChange={this.handleFileUpload}
            />
        </>
    );
};
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(Input);
