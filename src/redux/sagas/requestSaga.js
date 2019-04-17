import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
function* send(action){
    if (action.type == 'SEND_REQUEST'){
        
       const response = yield axios.get('podbean/login_podbean')
    console.log(response)
}
}
function* requestSaga() {
    yield takeLatest('SEND_REQUEST', send);
  }
  export default (requestSaga)