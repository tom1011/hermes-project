
import React, {Component} from 'react';
import {connect} from 'react-redux';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Podbean extends Component{
sendRequest=()=>{
  this.props.dispatch({type: 'SEND_REQUEST'})
}

  render(){
  return(
  <div>
    <button onClick={this.sendRequest}>Podbean</button>
    <p>
      Info Page
    </p>
  </div>
);
}
}
export default connect()(Podbean);