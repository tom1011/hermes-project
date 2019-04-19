const fileUpload = (state = '', action) => {
    switch(action.type) {
        case 'UPLOAD_DOCUMENT':
            return action.payload;
        default:
            return state;
    }
}

export default fileUpload;