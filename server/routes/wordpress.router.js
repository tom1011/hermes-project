
const pool = require('../modules/pool');

require('dotenv').config();

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var client_id = '65413'; // Your client id
var client_secret = process.env.CLIENT_SECRET_WORDPRESS; // Your secret
var redirect_uri = 'http://localhost:5000/wordpress/callback_wordpress'; // Your redirect uri
// note redirect uri is only for local development not for heroku
const router = express.Router();
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};// end random number gen.
// var stateKey = 'wordpress_auth_state';// cookie name

router.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
// this is to get authorization for our selves ie user dose not need to use this function
router.get('/login_wordpress', function(req, res) {
//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);
  // your application requests authorization
//   var scope = 'episode_publish'; // this is what we are requesting to use from the API
  res.redirect('https://public-api.wordpress.com/oauth2/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
    //   scope: scope, the default for wordpress is one blog not all for the user this is what I think we need
   // blog, for wordpress this is a unique id for the blog we will not be using this as default.
      redirect_uri: redirect_uri,
    //   state: state wordpress dose not use this??
    }));
});
// main authorization steeps this is where the user inputed information is sent along.
router.get('/callback_wordpress', function(req, res) {
  console.log('call back wordpress was hit')
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null; // this is the token we got back form wordpress
//   var blogId = req.query.blog_id || null;
//   var blogUrl = req.query.blog_url || null;

    var authOptions = {
      url: 'https://public-api.wordpress.com/oauth2/token',// I might need ot add post
      form: {// I might have to do parameter instead of form.
        code: code, // this is the podbean response code.
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },// up to here I think this will work
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },// I think this will work however it might need to be called something else/put in url diffrently.
      json: true
    }
});
module.exports = router;