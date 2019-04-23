const podbean = (state = {}, action) => {
    switch (action.type) {
      case 'SET_WORDPRESS_TOKEN'://this is token check to see if we have a token for the site.
      state = {...state,
        podbean_token: action.payload
    }// is this mutating state?
        return state;
      default:
        return state;
    }
  };


  export default podbean;