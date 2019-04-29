import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';


// import fileUpload from './fileUploadReducer';


import editReducer from './editReducer'
import podbean from './podbeanReducer';
import wordpress from './wordpressReducer';
import stepperReducer from './stepperReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in

  // will have audio file and name


  // fileUpload, // will have audio file and name

stepperReducer,
 
editReducer,
//keeps transcription and form
  podbean,
   // will have audio file and name
  wordpress,

});

export default rootReducer;
