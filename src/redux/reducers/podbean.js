const podbean = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PODBEAN_TOKEN':
      state = {...state,
        podbean_token: action.payload
    }// is this mutating state?
        return state;
      default:
        return state;
    }
  };


  export default podbean;