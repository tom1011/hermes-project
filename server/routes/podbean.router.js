let express = require('express');

let querystring = require('querystring');



require('dotenv').config()

var cookieParser = require('cookie-parser');
var client_id = '7ae314124aac5c7de467d'; // Your client id
var client_secret = process.env.CLIENT_SECRET_PODBEAN; // Your secret
var redirect_uri = 'https://hermes-host.herokuapp.com/callback_podbean'; // Your redirect uri
const router = express.Router();

// main authorization steeps this is where the user inputed information is sent along.
router.post('/callback_podbean', function (req, res, next) {
    console.log('call back was hit', req.body)
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var authOptions = {
        url: 'https://api.podbean.com/v1/oauth/token',// I might need ot add post
        form: {// I might have to do parameter instead of form.
            code: code, // this is the podbean response code.
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },// up to here I think this will work
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },// I think this will work however it might need to be called something else/put in url diffrently.
        json: true
    };
});
module.exports = router;