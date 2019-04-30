import { combineReducers } from 'redux';
const transcriptReducer = (state = {transcription: ` The plight of the Manatee has been lessened as of late. They haven't reached the numbers that we hope they haven't moved off the endangered species list. Although they are still in danger of being put back on very soon. While this is good news is it's important to note that we haven't reached a sustainable population yet and we need to continue our efforts here at Nature First and The World We Live In.  We hope to help the Manatee finally find a sustainable population where they can live and thrive without our influence, and your donations help. I hope that you can continue to donate to Nature first and to The World We Live In Podcast, so that we can help the manatee finally reach a place where they don't need our interference, where they can live in the ocean, and they can be happy without humans around making sure their population is being sustained.
Human influence on nature, as always, as I've said many times is not my favorite, but sometimes it's necessary. For example the Manatee wouldn't be here in a sustainable place without us, so for that I thank you and appreciate all of your help.
`}, action) => {
    switch (action.type) {
      case 'SET_TRANSCRIPT':
        return action.payload;
    
      default:
        return state;
    }
    console.log(state)
  };
  
  const formReducer = (state = {podbean: {piece: '',
title: '',
description: '',},
  wordpress: {title: '',
blog: '',
tags: '',
categories: '',}}, action) => {
    switch (action.type) {
      case 'SET_PODBEAN':
      console.log('in reducer', action.payload)
        return {...state,
        podbean: {...state.podbean,
        piece: action.payload.piece,
      title: action.payload.title,
    description: action.payload.description}
        };
      case 'SET_WORDPRESS':
        return {...state,
        wordpress: {...state.wordpress,
          title: action.payload.title,
        blog: action.payload.blog,
      tags: action.payload.tags,
      categories: action.payload.categories,
    }};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  const editReducer = combineReducers({
transcriptReducer,
formReducer


    })
  export default editReducer;