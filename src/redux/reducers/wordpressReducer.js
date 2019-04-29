const wordpress = (state = {wordpress_token: false}, action) => {
  switch (action.type) {
    case 'SET_WORDPRESS_TOKEN'://this is token check to see if we have a token for the site.
      state = {
        ...state,
        wordpress_token: action.payload
      }// is this mutating state?
      return state;

      case 'CHECK_TOKEN':
      console.log('hit conneted.')
        return state // we will need to change this back this is hard codded right now

    default:
      return state;
  }
};


export default wordpress;