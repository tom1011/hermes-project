const podbean = (state = {
  status: 'publish',
  type: 'public'
  //if it doesn't work, check 'type'
}, action) => {
    switch (action.type) {
      case 'SET_PODBEAN_TOKEN':
      state = {...state,
        podbean_token: action.payload
    }// is this mutating state?
    return state
    case 'UPDATE_PODBEAN':
    state = {
      ...state,
      title: action.payload
    }
    return state
    case 'UPDATE_PODBEAN_CONTENT':
    state = {
      ...state,
      content: action.payload.content
    }
        return state;
        case 'GET_PODBEAN':
        return state;
      default:
        return state;
    }
  };


  export default podbean;