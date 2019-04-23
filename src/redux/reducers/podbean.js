const podbean = (state = {
  status: 'publish',
  type: 'public'
  //if it doesn't work, check 'type'
}, action) => {
  switch (action.type) {
    case 'SET_PODBEAN_TOKEN':
      return {
        ...state,
        podbean_token: action.payload
      }
    case 'UPDATE_PODBEAN':
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description
      }
    case 'UPDATE_PODBEAN_MEDIA':
      return state = {
        ...state,
        media: 'Users/david/Downloads/harrywav.wav'
      };
    case 'GET_PODBEAN':
      return state;
    default:
      return state;
  }
};


export default podbean;