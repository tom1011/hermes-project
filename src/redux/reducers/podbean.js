const podbean = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PODBEAN_TOKEN':
      console.log('set podbean was hit', action.payload)
      state = {...state,
        podbean_token: action.payload
    }// is this mutating state?
        return state;
      default:
        return state;
    }
  };


  export default podbean;