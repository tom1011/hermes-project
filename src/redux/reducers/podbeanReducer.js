//required and also default values to post
const podbean = (state = {
  status: 'publish',
  type: 'public',
  podbean_token: false
  //if it doesn't work, check 'type'
}, action) => {
  switch (action.type) {
    case 'SET_PODBEAN_TOKEN':
      return {
        ...state,
        podbean_token: action.payload //this is a boolean to check that we have a token before moving forward / this is needed to publish /conditional rendering later
      }
    case 'UPDATE_PODBEAN': //get information from the form 
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description
      }
    case 'UPDATE_PODBEAN_MEDIA':  //this is now the actual file
      return state = {
        ...state,
        media: action.payload
      };
    default:
      return state;
  }
};


export default podbean;