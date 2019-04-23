import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// POST saga ie saga to post the podcast to podbean (will add later)


//below function is for checking if we have a token from the site.
function* checktoken () { 
    try {
        const tokenCheck = yield axios({
            method: 'GET',
            url: '/wordpress/token_check',
        })
        yield put ({ type: 'SET_WORDPRESS_TOKEN', payload: tokenCheck.data})// data should be a bowlean.
        // will send to podbean reducer and change the token value
    }
    catch(error){
        console.log('Token get podbean failed logging error', error)
    }
}

function* wordpressSaga() {
    yield takeLatest('CHECK_TOKEN', checktoken);
  }
  
  export default wordpressSaga;