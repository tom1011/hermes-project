const wordpress = (state = {wordpress_token: false}, action) => {
  switch (action.type) {
    case 'SET_WORDPRESS_TOKEN'://this is token check to see if we have a token for the site.
      return {
        ...state,
        wordpress_token: action.payload
      }
      case 'CHECK_TOKEN': // hits reducer to update it (for component did mount)
        return state 

        case 'SET_WORDPRESS': // setting the post object to wordpress.
        // left side is using the  proper name to post to the API.
        return {
          ...state,
          title: action.payload.title, // title
          content: action.payload.transcription, // the translation
          tags: action.payload.tags || '',
          categories: action.payload.categories || 'uncategoried',
        }
        
    default:
      return state;
  }
};


export default wordpress;