import {takeLatest } from 'redux-saga/effects';
import axios from 'axios';

}
function* requestSaga() {
    yield takeLatest('SEND_REQUEST', send);
}
export default (requestSaga)