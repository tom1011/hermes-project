import { combineReducers } from 'redux';
const transcriptReducer = (state = {transcription: ` The question of whether or not Gates count as doors is a difficult one while gate does bar entrance to a place just like a door does.
Unlike a door. It's not meant as a opening as a portal and something new. It's really meant to keep others out and while the door can keep leather at Tandy Brothers out. It's important to note that door is also let people in that's why we say when one door opens or when one door closes another one opens a date the idea of a gate is just too close it. It's difficult sometimes to decide whether or not you want to put in a gate or door on your home doors offer. A lot of things Gates also offer a lot but a gate is more of if you want people to know that sometimes they won't be welcomed a nice door with a nice frame and all that is very inviting a gate is something that people look at and they think to themselves. Well, they don't want me in here. Sometimes they can come with fences a door doesn't come with a fence. It can be reinforced maybe but I'm like a gate it does let people in`}, action) => {
    switch (action.type) {
      case 'SET_TRANSCRIPT':
        return action.payload;
    
      default:
        return state;
    }
    console.log(state)
  };
  
  const formReducer = (state = {podbean: {},
  wordpress: {}}, action) => {
    switch (action.type) {
      case 'SET_PODBEAN':
        return {...state,
        podbean: {...state.podbeen,
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