
import React, {Component} from 'react';
import {connect} from 'react-redux';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component{
sendRequest=()=>{
  this.props.dispatch({type: 'SEND_REQUEST'})
}
fileUpload=()=>{
  this.props.dispatch({type: 'SEND_AUDIO'})
}

  fileTest = () => {
    this.props.dispatch({ type: 'PUBLISH_WORDPRESS' })
  }
  render(){
  return(
  <div>


    <button onClick={this.fileUpload}> Test transcript</button>
    <br></br>
    <button onClick= {this.fileTest} > push this for WP</button>

    <p> 
      Info Page
    </p>
  </div>
);
}
}
export default connect()(InfoPage);
