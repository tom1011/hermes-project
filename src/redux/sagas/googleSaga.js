import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
function* sendAudio(action){
   console.log(action.payload)
    try{
 
    // console.log(action.payload)
      const response =   yield axios({
            method: 'POST',
            data: action.payload,
            url: '/googleCloud/upload'
        })

    console.log(response.data)
    
     yield put({type: 'GET_TRANSCRIPT', payload: response.data })
    }
    catch (err) {
       
    
}}

function* getTranscript(action){
    // console.log(action.payload.bucketName)
    try{
    const response = yield axios.get(`googleCloud/transcript`, {
        params: {
      fileName: action.payload,
     

        }}
)
console.log('responseT', response.data)
yield put({type: "SET_TRANSCRIPT", payload: response.data})
}

catch (err){}
}


function* googleSaga() {
    yield takeLatest('SEND_AUDIO', sendAudio);
    yield takeLatest('GET_TRANSCRIPT', getTranscript);
}
export default googleSaga