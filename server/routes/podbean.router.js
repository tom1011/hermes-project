let express = require('express');
let request = require('request');
let querystring = require('querystring');
const pool = require('../modules/pool');

const axios = require('axios');
require('dotenv').config()

var cookieParser = require('cookie-parser');
var client_id = '7ae314124aac5c7de467d'; // Your client id
var client_secret = process.env.CLIENT_SECRET_PODBEAN; // Your secret
var redirect_uri = 'https://hermes-host.herokuapp.com/callback_podbean'; // Your redirect uri
const router = express.Router();
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};// end random number gen.
var stateKey = 'podbean_auth_state';// cookie name
;



router.use(express.static(__dirname + '/public'))

    .use(cookieParser());
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});
// this is to get authorization for our selves ie user dose not need to use this function
router.get('/login_podbean', function (req, res, next) {
    
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'episode_publish'; // this is what we are requesting to use from the API
    res.redirect('https://api.podbean.com/v1/dialog/oauth?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});
// main authorization steeps this is where the user inputed information is sent along.
router.post('/callback_podbean', function (req, res, next) {
    console.log('call back was hit')
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;// not sure if sent back
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);// the statekey is the cookie that its being saved too.
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
    }
});
module.exports = router;